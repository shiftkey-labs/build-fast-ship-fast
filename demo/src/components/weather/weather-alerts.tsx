import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  WeatherData, 
  getWeatherInfo, 
  formatTemperature,
  formatWindSpeed,
  getUVLevel,
  calculateWindChill,
  calculateHeatIndex
} from '@/lib/weather-utils'

interface WeatherAlertsProps {
  weatherData: WeatherData
}

interface Alert {
  type: 'warning' | 'watch' | 'advisory' | 'info'
  title: string
  description: string
  icon: string
  color: string
  bgColor: string
  priority: number
}

export default function WeatherAlerts({ weatherData }: WeatherAlertsProps) {
  const current = weatherData.current
  const daily = weatherData.daily
  const hourly = weatherData.hourly

  // Generate alerts based on current and forecast conditions
  const alerts: Alert[] = []

  // Temperature-based alerts
  const heatIndex = calculateHeatIndex(current.temperature_2m, current.relative_humidity_2m)
  const windChill = calculateWindChill(current.temperature_2m, current.wind_speed_10m)

  if (heatIndex > 32) {
    alerts.push({
      type: 'warning',
      title: 'Heat Warning',
      description: `Heat index of ${formatTemperature(heatIndex)} feels dangerous. Stay hydrated and seek air conditioning.`,
      icon: '🥵',
      color: 'text-red-800',
      bgColor: 'bg-red-50 border-red-200',
      priority: 1
    })
  } else if (heatIndex > 27) {
    alerts.push({
      type: 'advisory',
      title: 'Heat Advisory',
      description: `Heat index of ${formatTemperature(heatIndex)}. Take precautions when outdoors.`,
      icon: '🌡️',
      color: 'text-orange-800',
      bgColor: 'bg-orange-50 border-orange-200',
      priority: 3
    })
  }

  if (windChill < -20) {
    alerts.push({
      type: 'warning',
      title: 'Extreme Cold Warning',
      description: `Wind chill of ${formatTemperature(windChill)} poses risk of frostbite. Limit outdoor exposure.`,
      icon: '🥶',
      color: 'text-blue-800',
      bgColor: 'bg-blue-50 border-blue-200',
      priority: 1
    })
  } else if (windChill < -10) {
    alerts.push({
      type: 'advisory',
      title: 'Cold Weather Advisory',
      description: `Wind chill of ${formatTemperature(windChill)}. Dress warmly and limit outdoor activities.`,
      icon: '❄️',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200',
      priority: 3
    })
  }

  // Wind-based alerts
  if (current.wind_gusts_10m > 70) {
    alerts.push({
      type: 'warning',
      title: 'High Wind Warning',
      description: `Wind gusts up to ${formatWindSpeed(current.wind_gusts_10m)}. Avoid driving high-profile vehicles and secure outdoor objects.`,
      icon: '💨',
      color: 'text-purple-800',
      bgColor: 'bg-purple-50 border-purple-200',
      priority: 1
    })
  } else if (current.wind_gusts_10m > 50 || current.wind_speed_10m > 40) {
    alerts.push({
      type: 'advisory',
      title: 'Wind Advisory',
      description: `Strong winds with gusts up to ${formatWindSpeed(current.wind_gusts_10m)}. Use caution when driving.`,
      icon: '🌬️',
      color: 'text-purple-700',
      bgColor: 'bg-purple-50 border-purple-200',
      priority: 3
    })
  }

  // Precipitation alerts
  const weatherInfo = getWeatherInfo(current.weather_code)
  const next6Hours = hourly.precipitation.slice(0, 6)
  const totalPrecipitation = next6Hours.reduce((sum, precip) => sum + precip, 0)

  if (current.weather_code >= 95) {
    alerts.push({
      type: 'warning',
      title: 'Thunderstorm Warning',
      description: `${weatherInfo.condition} in progress. Seek indoor shelter immediately. Avoid windows and electrical equipment.`,
      icon: '⛈️',
      color: 'text-red-800',
      bgColor: 'bg-red-50 border-red-200',
      priority: 1
    })
  }

  if (totalPrecipitation > 25) {
    alerts.push({
      type: 'warning',
      title: 'Heavy Rain Warning',
      description: `Expected ${totalPrecipitation.toFixed(1)}mm of rain in next 6 hours. Flooding possible in low-lying areas.`,
      icon: '🌧️',
      color: 'text-blue-800',
      bgColor: 'bg-blue-50 border-blue-200',
      priority: 2
    })
  } else if (totalPrecipitation > 10) {
    alerts.push({
      type: 'advisory',
      title: 'Rain Advisory',
      description: `Expecting ${totalPrecipitation.toFixed(1)}mm of rain in next 6 hours. Road conditions may be slippery.`,
      icon: '🌦️',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200',
      priority: 3
    })
  }

  // Snow alerts
  const next6HoursSnow = hourly.snowfall.slice(0, 6)
  const totalSnowfall = next6HoursSnow.reduce((sum, snow) => sum + snow, 0)

  if (totalSnowfall > 15) {
    alerts.push({
      type: 'warning',
      title: 'Heavy Snow Warning',
      description: `Expected ${totalSnowfall.toFixed(1)}cm of snow in next 6 hours. Travel may become dangerous.`,
      icon: '❄️',
      color: 'text-blue-800',
      bgColor: 'bg-blue-50 border-blue-200',
      priority: 1
    })
  } else if (totalSnowfall > 5) {
    alerts.push({
      type: 'advisory',
      title: 'Snow Advisory',
      description: `Expecting ${totalSnowfall.toFixed(1)}cm of snow in next 6 hours. Drive with caution.`,
      icon: '🌨️',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200',
      priority: 3
    })
  }

  // Visibility alerts
  if (current.visibility < 1000) {
    alerts.push({
      type: 'warning',
      title: 'Dense Fog Warning',
      description: `Visibility reduced to ${Math.round(current.visibility / 1000)}km. Driving conditions extremely hazardous.`,
      icon: '🌫️',
      color: 'text-gray-800',
      bgColor: 'bg-gray-50 border-gray-200',
      priority: 2
    })
  } else if (current.visibility < 5000) {
    alerts.push({
      type: 'advisory',
      title: 'Fog Advisory',
      description: `Reduced visibility to ${Math.round(current.visibility / 1000)}km. Use low beam headlights and reduce speed.`,
      icon: '🌁',
      color: 'text-gray-700',
      bgColor: 'bg-gray-50 border-gray-200',
      priority: 3
    })
  }

  // UV alerts
  const uvInfo = getUVLevel(current.uv_index)
  if (current.uv_index >= 8) {
    alerts.push({
      type: 'warning',
      title: 'High UV Warning',
      description: `${uvInfo.level} UV index of ${current.uv_index.toFixed(1)}. ${uvInfo.advice}`,
      icon: '☀️',
      color: 'text-orange-800',
      bgColor: 'bg-orange-50 border-orange-200',
      priority: 3
    })
  }

  // Pressure change alerts
  const pressureChange = current.pressure_msl - current.surface_pressure
  if (Math.abs(pressureChange) > 10) {
    alerts.push({
      type: 'info',
      title: 'Rapid Pressure Change',
      description: `Pressure ${pressureChange > 0 ? 'rising' : 'falling'} rapidly. Weather patterns may change quickly.`,
      icon: '📊',
      color: 'text-indigo-800',
      bgColor: 'bg-indigo-50 border-indigo-200',
      priority: 4
    })
  }

  // Maritime alerts (specific to Halifax's coastal location)
  if (current.wind_speed_10m > 25 && weatherInfo.condition.includes('rain')) {
    alerts.push({
      type: 'advisory',
      title: 'Marine Weather Advisory',
      description: 'Strong winds and precipitation create hazardous marine conditions. Small craft should seek harbor.',
      icon: '🌊',
      color: 'text-cyan-800',
      bgColor: 'bg-cyan-50 border-cyan-200',
      priority: 3
    })
  }

  // Sort alerts by priority (1 = highest priority)
  const sortedAlerts = alerts.sort((a, b) => a.priority - b.priority)

  // If no alerts, show a positive message
  if (sortedAlerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span>✅</span>
            Weather Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">😊</span>
              <div>
                <div className="font-medium text-green-900">No Active Weather Alerts</div>
                <div className="text-sm text-green-700 mt-1">
                  Current weather conditions are favorable. Enjoy your day!
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <span>⚠️</span>
          Weather Alerts ({sortedAlerts.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedAlerts.map((alert, index) => (
          <div key={index} className={`p-4 border rounded-lg ${alert.bgColor}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{alert.icon}</span>
              <div className="flex-1">
                <div className={`font-semibold ${alert.color} flex items-center gap-2`}>
                  {alert.title}
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    alert.type === 'warning' ? 'bg-red-100 text-red-800' :
                    alert.type === 'watch' ? 'bg-orange-100 text-orange-800' :
                    alert.type === 'advisory' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.type.toUpperCase()}
                  </span>
                </div>
                <div className={`text-sm ${alert.color} mt-1`}>
                  {alert.description}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Safety Tips */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="font-medium text-blue-900 mb-2">🛡️ General Safety Tips</div>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Stay informed about changing weather conditions</p>
            <p>• Have emergency supplies ready (flashlight, water, first aid)</p>
            <p>• Follow local authorities' guidance during severe weather</p>
            <p>• Keep your mobile device charged for emergency communications</p>
            <p>• Check on elderly neighbors and family members during extreme weather</p>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="font-medium text-red-900 mb-2">🚨 Emergency Contacts (Halifax)</div>
          <div className="text-sm text-red-800 space-y-1">
            <p>• Emergency Services: 911</p>
            <p>• Halifax Regional Police: (902) 490-5020</p>
            <p>• Environment Canada Weather Office: 1-900-565-5555</p>
            <p>• Halifax Transit (service updates): (902) 480-8000</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 