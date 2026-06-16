interface StageDefinition {
  label: string
  bgVar: string
  textVar: string
  borderVar: string
  pulse?: boolean
}

interface StageBadgeProps {
  stage: number
}

const stageMap: Record<number, StageDefinition> = {
  0: { label: 'None', bgVar: '--stage-1-bg', textVar: '--stage-1-text', borderVar: '--stage-1-border' },
  1: { label: 'Accumulation', bgVar: '--stage-1-bg', textVar: '--stage-1-text', borderVar: '--stage-1-border' },
  2: { label: 'OI Matrix', bgVar: '--stage-2-bg', textVar: '--stage-2-text', borderVar: '--stage-2-border' },
  3: { label: 'Trap', bgVar: '--stage-3-bg', textVar: '--stage-3-text', borderVar: '--stage-3-border', pulse: true },
  4: { label: 'Distribution', bgVar: '--stage-4-bg', textVar: '--stage-4-text', borderVar: '--stage-4-border' },
}

/**
 * Colour-coded lifecycle stage badge.
 * @param stage - Current lifecycle stage
 */
export function StageBadge({ stage }: StageBadgeProps) {
  const stageInfo = stageMap[stage] ?? stageMap[0]

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${stageInfo.pulse ? 'animate-trap-pulse' : ''}`}
      style={{
        background: `var(${stageInfo.bgVar})`,
        color: `var(${stageInfo.textVar})`,
        border: `1px solid var(${stageInfo.borderVar})`,
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.025em',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      {stageInfo.label}
    </span>
  )
}
