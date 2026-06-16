/**
 * Converts snake_case API keys into camelCase recursively.
 * @param value - Any value returned from the API
 */
export function cameliseKeys<T>(value: unknown): T {
  if (Array.isArray(value)) {
    return value.map((item) => cameliseKeys(item)) as T
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, child]) => [
        key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase()),
        cameliseKeys(child),
      ]),
    ) as T
  }

  return value as T
}

/**
 * Formats an ISO date as a compact relative label.
 * @param isoDate - ISO timestamp or null
 */
export function formatRelativeTime(isoDate?: string | null): string {
  if (!isoDate) return 'Not scanned yet'
  const timestamp = new Date(isoDate).getTime()
  if (Number.isNaN(timestamp)) return 'Scan time unknown'

  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000))
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

/**
 * Formats a price with more precision for small values.
 * @param value - Numeric price
 */
export function formatPrice(value: number): string {
  if (!Number.isFinite(value)) return '--'
  if (Math.abs(value) < 1) return `$${value.toFixed(6)}`
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
}

/**
 * Converts direction values to uppercase dashboard labels.
 * @param direction - Direction string from the API
 */
export function normaliseDirection(direction: string): 'LONG' | 'SHORT' {
  return direction.toUpperCase().includes('SHORT') ? 'SHORT' : 'LONG'
}
