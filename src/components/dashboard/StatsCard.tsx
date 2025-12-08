interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatsCard({ title, value, subtitle, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-gray-900 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-yellow-400/10 flex items-center justify-center text-yellow-400">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            <svg className={`w-4 h-4 ${!trend.isPositive && 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <h3 className="text-3xl font-black mb-1">{value}</h3>
      <p className="text-sm text-gray-500">{title}</p>
      {subtitle && <p className="text-xs text-gray-600 mt-1">{subtitle}</p>}
    </div>
  )
}
