export interface Token {
  symbol: string
  currentStage: number
  stageConfidence: number
  lastScannedAt: string | null
}

export interface DetectionLayer {
  layerNumber: number
  layerName: string
  score: number
  triggered: boolean
  signals: Array<Record<string, unknown> | string>
  scannedAt?: string
}

export interface TokenDetail {
  symbol: string
  layers: DetectionLayer[]
}

export interface Position {
  id?: number
  symbol: string
  direction: 'LONG' | 'SHORT' | 'Long' | 'Short'
  entryPrice: number
  currentPrice: number
  unrealisedPnl: number
  unrealisedPnlUsd?: number
  leverage: number
  status: 'open' | 'closed'
  openedAt?: string
}

export interface Stats {
  winRate: number
  totalPnlPct: number
  totalTrades: number
  sharpeRatio: number
  symbols?: number
}

export interface ScanResult {
  symbol: string
  currentStage: number
  stage: string
  stageConfidence: number
  confidenceLevel: string
  layersTriggered: number[]
  recommendation: string
  signals: Array<Record<string, unknown>>
}
