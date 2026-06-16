import type { DetectionLayer, Position, ScanResult, Stats, Token, TokenDetail } from '../types'
import { cameliseKeys } from './utils'

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8001'

/**
 * Fetches JSON and raises a readable error for non-2xx responses.
 * @param path - API path beginning with slash
 * @param init - Optional fetch configuration
 */
async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, init)
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.detail ?? `Request failed with ${response.status}`)
  }
  return cameliseKeys<T>(await response.json())
}

/** Fetches all monitored tokens with their current lifecycle stage. */
export function getTokens(): Promise<Token[]> {
  return requestJson<Token[]>('/api/tokens')
}

/**
 * Fetches detection layer scores for one token.
 * @param symbol - Token trading symbol
 */
export async function getToken(symbol: string): Promise<TokenDetail> {
  const detail = await requestJson<TokenDetail>(`/api/tokens/${encodeURIComponent(symbol)}`)
  detail.layers = detail.layers.map((layer) => ({
    ...layer,
    layerName: layer.layerName ?? `Layer ${layer.layerNumber}`,
    score: Number(layer.score ?? 0),
  })) as DetectionLayer[]
  return detail
}

/** Fetches all open paper positions with live PnL. */
export function getPositions(): Promise<Position[]> {
  return requestJson<Position[]>('/api/positions')
}

/** Fetches portfolio-level stats from the most recent backtest results. */
export function getStats(): Promise<Stats> {
  return requestJson<Stats>('/api/stats')
}

/**
 * Triggers an immediate crime pump detection scan for one token.
 * @param symbol - Token trading symbol
 */
export function scanToken(symbol: string): Promise<ScanResult> {
  return requestJson<ScanResult>(`/api/scan/${encodeURIComponent(symbol)}`, {
    method: 'POST',
  })
}
