"""
Bitget Skill Hub API Client

Provides normalized access to the Bitget Skill Hub perception skills used by
Mantis: sentiment-analyst, market-intel, and news-briefing.
"""

from typing import Any, Optional

import httpx

from config.settings import BITGET_API_KEY, BITGET_SKILL_HUB_BASE_URL
from utils.logger import get_logger

log = get_logger("bitget_skills")


class BitgetSkillsClient:
    """Async client for the Bitget Skill Hub REST API.

    The client wraps the three Skill Hub modules used by the Mantis MVP and
    returns small, stable dictionaries that the data pipeline can map into the
    token model. Network failures, missing credentials, malformed payloads, and
    API-level errors are logged and return None instead of raising.
    """

    def __init__(self, api_key: str | None = None, base_url: str | None = None):
        """Initialise the Bitget Skill Hub client.

        Args:
            api_key: Optional API key override. Defaults to BITGET_API_KEY.
            base_url: Optional Skill Hub base URL override.
        """
        self.api_key = api_key if api_key is not None else BITGET_API_KEY
        self.base_url = (base_url or BITGET_SKILL_HUB_BASE_URL).rstrip("/")
        self._client: Optional[httpx.AsyncClient] = None

    async def _get_client(self) -> httpx.AsyncClient:
        """Create or reuse the underlying HTTP client."""
        if self._client is None or self._client.is_closed:
            self._client = httpx.AsyncClient(
                base_url=self.base_url,
                timeout=30.0,
                headers={
                    "Accept": "application/json",
                    "Authorization": f"Bearer {self.api_key}",
                    "X-BG-API-KEY": self.api_key,
                },
            )
        return self._client

    async def _request_skill(self, skill_name: str, symbol: str) -> Optional[dict[str, Any]]:
        """Call one Skill Hub skill and return its data payload.

        Args:
            skill_name: Skill Hub slug such as ``sentiment-analyst``.
            symbol: Trading symbol to analyse.

        Returns:
            The API data payload when available, otherwise None.
        """
        if not self.api_key:
            log.warning(
                "bitget_skill_hub_no_key",
                message="No BITGET_API_KEY configured. Skipping Bitget Skill Hub data.",
                skill=skill_name,
                symbol=symbol,
            )
            return None

        try:
            client = await self._get_client()
            response = await client.get(f"/{skill_name}", params={"symbol": symbol})
            response.raise_for_status()
            payload = response.json()
        except httpx.HTTPStatusError as error:
            log.error(
                "bitget_skill_hub_http_error",
                status=error.response.status_code,
                skill=skill_name,
                symbol=symbol,
            )
            return None
        except httpx.HTTPError as error:
            log.error(
                "bitget_skill_hub_request_error",
                error=str(error),
                skill=skill_name,
                symbol=symbol,
            )
            return None
        except Exception as error:
            log.error(
                "bitget_skill_hub_error",
                error=str(error),
                skill=skill_name,
                symbol=symbol,
            )
            return None

        if self._payload_has_error(payload):
            log.warning(
                "bitget_skill_hub_api_error",
                code=payload.get("code"),
                message=payload.get("msg") or payload.get("message"),
                skill=skill_name,
                symbol=symbol,
            )
            return None

        data = payload.get("data", payload)
        if not isinstance(data, dict):
            log.warning(
                "bitget_skill_hub_unexpected_payload",
                skill=skill_name,
                symbol=symbol,
                payload_type=type(data).__name__,
            )
            return None
        return data

    @staticmethod
    def _payload_has_error(payload: Any) -> bool:
        """Return True when a Skill Hub response indicates an API-level error."""
        if not isinstance(payload, dict):
            return True

        code = payload.get("code")
        success = payload.get("success")
        status = payload.get("status")

        if success is False:
            return True
        if isinstance(status, str) and status.lower() in {"error", "failed", "fail"}:
            return True
        if code is None:
            return False
        return str(code) not in {"0", "200", "success", "SUCCESS"}

    @staticmethod
    def _pick(data: dict[str, Any], *keys: str) -> Any:
        """Return the first present value from a response dict."""
        for key in keys:
            if key in data:
                return data[key]
        return None

    @staticmethod
    def _to_float(value: Any) -> Optional[float]:
        """Normalize numeric API values to float or None."""
        if value is None or value == "":
            return None
        if isinstance(value, bool):
            return float(value)
        if isinstance(value, (int, float)):
            return float(value)
        if isinstance(value, str):
            cleaned = value.strip().replace(",", "")
            is_percent = cleaned.endswith("%")
            cleaned = cleaned.rstrip("%")
            try:
                number = float(cleaned)
            except ValueError:
                return None
            return number / 100 if is_percent else number
        return None

    @staticmethod
    def _to_bool(value: Any) -> Optional[bool]:
        """Normalize common boolean API values to bool or None."""
        if value is None or value == "":
            return None
        if isinstance(value, bool):
            return value
        if isinstance(value, (int, float)):
            return value != 0
        if isinstance(value, str):
            cleaned = value.strip().lower()
            if cleaned in {"true", "yes", "y", "1", "negative"}:
                return True
            if cleaned in {"false", "no", "n", "0", "positive", "neutral"}:
                return False
        return None

    async def get_sentiment(self, symbol: str) -> Optional[dict[str, Optional[float]]]:
        """Fetch funding, positioning, and sentiment data for a symbol.

        Args:
            symbol: Trading symbol such as ``BTC`` or ``BTCUSDT``.

        Returns:
            A dict with ``funding_rate``, ``long_short_ratio``, and
            ``fear_greed_index`` values normalized to floats, or None if the
            Skill Hub request fails.
        """
        data = await self._request_skill("sentiment-analyst", symbol)
        if data is None:
            return None

        return {
            "funding_rate": self._to_float(
                self._pick(data, "funding_rate", "fundingRate", "current_funding_rate")
            ),
            "long_short_ratio": self._to_float(
                self._pick(data, "long_short_ratio", "longShortRatio", "ls_ratio")
            ),
            "fear_greed_index": self._to_float(
                self._pick(data, "fear_greed_index", "fearGreedIndex", "fear_greed")
            ),
        }

    async def get_market_intel(self, symbol: str) -> Optional[dict[str, Optional[float]]]:
        """Fetch open-interest and whale-flow data for a symbol.

        Args:
            symbol: Trading symbol such as ``BTC`` or ``BTCUSDT``.

        Returns:
            A dict with ``oi_change_1h``, ``whale_activity_score``, and
            ``etf_flow_usd`` values normalized to floats, or None if the Skill
            Hub request fails.
        """
        data = await self._request_skill("market-intel", symbol)
        if data is None:
            return None

        return {
            "oi_change_1h": self._to_float(
                self._pick(data, "oi_change_1h", "oiChange1h", "open_interest_change_1h")
            ),
            "whale_activity_score": self._to_float(
                self._pick(data, "whale_activity_score", "whaleActivityScore", "whale_score")
            ),
            "etf_flow_usd": self._to_float(
                self._pick(data, "etf_flow_usd", "etfFlowUsd", "etf_flow")
            ),
        }

    async def get_news(self, symbol: str) -> Optional[dict[str, Any]]:
        """Fetch recent news and narrative context for a symbol.

        Args:
            symbol: Trading symbol such as ``BTC`` or ``BTCUSDT``.

        Returns:
            A dict with ``has_negative_narrative`` as bool or None and
            ``narrative_summary`` as a string, or None if the Skill Hub request
            fails.
        """
        data = await self._request_skill("news-briefing", symbol)
        if data is None:
            return None

        summary = self._pick(data, "narrative_summary", "narrativeSummary", "summary")
        return {
            "has_negative_narrative": self._to_bool(
                self._pick(data, "has_negative_narrative", "hasNegativeNarrative", "negative")
            ),
            "narrative_summary": summary if isinstance(summary, str) else "",
        }

    async def close(self) -> None:
        """Close the underlying HTTP client."""
        if self._client and not self._client.is_closed:
            await self._client.aclose()
