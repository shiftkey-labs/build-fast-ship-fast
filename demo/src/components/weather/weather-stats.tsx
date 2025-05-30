import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  WeatherData, 
  formatTemperature, 
  formatPressure, 
  formatWindSpeed, 
  formatVisibility,
  getUVLevel,
  calculateHeatIndex,
  calculateWindChill,
  getCloudCoverDescription
} from '@/lib/weather-utils'

interface WeatherStatsProps {
  weatherData: WeatherData
}

export default function WeatherStats({ weatherData }: WeatherStatsProps) {
  const current = weatherData.current
  const uvInfo = getUVLevel(current.uv_index)
  const heatIndex = calculateHeatIndex(current.temperature_2m, current.relative_humidity_2m)
  const windChill = calculateWindChill(current.temperature_2m, current.wind_speed_10m)
  const cloudCoverDesc = getCloudCoverDescription(current.cloud_cover)

  const stats = [
    {
      label: 'Heat Index',
      value: formatTemperature(heatIndex),
      icon: '🌡️',
      description: 'How hot it feels',
      show: current.temperature_2m > 26
    },
    {
      label: 'Wind Chill',
      value: formatTemperature(windChill),
      icon: '🌬️',
      description: 'How cold it feels',
      show: current.temperature_2m < 10 && current.wind_speed_10m > 4.8
    },
    {
      label: 'Dew Point',
      value: formatTemperature(current.temperature_2m - ((100 - current.relative_humidity_2m) / 5)),
      icon: '💧',
      description: 'Moisture saturation point'
    },
    {
      label: 'UV Index',
      value: current.uv_index.toFixed(1),
      icon: '☀️',
      description: uvInfo.level,
      color: uvInfo.color
    },
    {
      label: 'Visibility',
      value: formatVisibility(current.visibility),
      icon: '👁️',
      description: 'How far you can see'
    },
    {
      label: 'Cloud Cover',
      value: `${current.cloud_cover}%`,
      icon: '☁️',
      description: cloudCoverDesc
    },
    {
      label: 'Pressure',
      value: formatPressure(current.pressure_msl),
      icon: '📊',
      description: 'Atmospheric pressure'
    },
    {
      label: 'Surface Pressure',
      value: formatPressure(current.surface_pressure),
      icon: '🌍',
      description: 'Ground level pressure'
    }
  ]

  const visibleStats = stats.filter(stat => stat.show !== false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weather Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {visibleStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <div className="font-medium text-gray-900">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            </div>
            <div className={`text-lg font-bold ${stat.color || 'text-gray-900'}`}>
              {stat.value}
            </div>
          </div>
        ))}

        {/* Pressure Trend */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-blue-900">Pressure Trend</span>
            <span className="text-blue-700">
              {current.pressure_msl > current.surface_pressure ? '📈 Rising' : '📉 Falling'}
            </span>
          </div>
          <div className="text-sm text-blue-700">
            {Math.abs(current.pressure_msl - current.surface_pressure).toFixed(1)} hPa difference
          </div>
        </div>

        {/* Air Comfort */}
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <div className="font-medium text-green-900 mb-2">Air Comfort</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-green-700">Humidity Level</div>
              <div className="font-medium">
                {current.relative_humidity_2m < 30 ? 'Dry' : 
                 current.relative_humidity_2m > 70 ? 'Humid' : 'Comfortable'}
              </div>
            </div>
            <div>
              <div className="text-green-700">Air Quality</div>
              <div className="font-medium">
                {current.visibility > 10000 ? 'Excellent' : 
                 current.visibility > 5000 ? 'Good' : 'Poor'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 