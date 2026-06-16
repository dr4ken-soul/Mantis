import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { DetectionLayer } from '../types'

const layerColourMap: Record<number, string> = {
  1: 'var(--layer-1)',
  2: 'var(--layer-2)',
  3: 'var(--layer-3)',
  4: 'var(--layer-4)',
}

interface DetectionChartProps {
  layers: DetectionLayer[]
}

/**
 * Horizontal chart for layer scores.
 * @param layers - Detection layer rows
 */
export function DetectionChart({ layers }: DetectionChartProps) {
  const data = layers.map((layer) => ({
    ...layer,
    label: `L${layer.layerNumber}`,
    scorePercent: Math.max(0, Math.min(100, Number(layer.score ?? 0) * 100)),
  }))

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            stroke="var(--text-muted)"
            tick={{ fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}
          />
          <YAxis
            dataKey="label"
            type="category"
            width={42}
            stroke="var(--text-muted)"
            tick={{ fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255, 248, 240, 0.03)' }}
            contentStyle={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
            }}
            formatter={(value: number, _name, item) => [
              `${Number(value).toFixed(0)}%`,
              String(item.payload.layerName ?? item.payload.label),
            ]}
          />
          <Bar dataKey="scorePercent" radius={[0, 8, 8, 0]} barSize={28}>
            {data.map((entry) => (
              <Cell
                key={entry.layerNumber}
                fill={layerColourMap[entry.layerNumber] ?? 'var(--accent)'}
                opacity={entry.triggered ? 1 : 0.3}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
