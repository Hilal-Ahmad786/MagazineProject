interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}

export function StatsCard({ title, value, icon, change, changeType = 'neutral' }: StatsCardProps) {
  const changeColor = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400',
  }[changeType]

  return (
    <div className="bg-gray-900 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{title}</p>
          <p className="text-3xl font-black">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${changeColor}`}>
              {changeType === 'positive' && '↑ '}
              {changeType === 'negative' && '↓ '}
              {change}
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-yellow-400/10 flex items-center justify-center text-yellow-400">
          {icon}
        </div>
      </div>
    </div>
  )
}
