'use client'

interface ViewsChartProps {
  data: Array<{ date: string; views: number }>
}

export function ViewsChart({ data }: ViewsChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-gray-900 p-6">
        <h3 className="text-lg font-bold mb-4">Günlük Görüntülenme</h3>
        <div className="h-48 flex items-center justify-center text-gray-600">
          Henüz veri yok
        </div>
      </div>
    )
  }

  const maxViews = Math.max(...data.map(d => d.views), 1)
  
  // Get last 14 days
  const recentData = data.slice(-14)

  return (
    <div className="bg-gray-900 p-6">
      <h3 className="text-lg font-bold mb-4">Günlük Görüntülenme</h3>
      
      <div className="h-48 flex items-end gap-1">
        {recentData.map((item, index) => {
          const height = (item.views / maxViews) * 100
          const date = new Date(item.date)
          const dayName = date.toLocaleDateString('tr-TR', { weekday: 'short' })
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center justify-end h-36">
                <span className="text-xs text-gray-500 mb-1">{item.views}</span>
                <div
                  className="w-full bg-yellow-400 transition-all duration-300 hover:bg-yellow-300"
                  style={{ height: `${Math.max(height, 4)}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">{dayName}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
