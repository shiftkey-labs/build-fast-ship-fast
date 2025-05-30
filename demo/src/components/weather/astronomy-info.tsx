import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WeatherData, formatTime } from '@/lib/weather-utils'

interface AstronomyInfoProps {
  weatherData: WeatherData
}

export default function AstronomyInfo({ weatherData }: AstronomyInfoProps) {
  const today = weatherData.daily
  const current = weatherData.current
  
  // Get today's astronomical data
  const todayIndex = 0 // First day in the daily data
  const sunrise = today.sunrise[todayIndex]
  const sunset = today.sunset[todayIndex]
  const daylightDuration = today.daylight_duration[todayIndex]
  const sunshineDuration = today.sunshine_duration[todayIndex]

  // Calculate current sun position (approximate)
  const now = new Date()
  const sunriseTime = new Date(sunrise)
  const sunsetTime = new Date(sunset)
  const isDay = current.is_day === 1
  
  // Calculate daylight progress
  let daylightProgress = 0
  if (isDay && now >= sunriseTime && now <= sunsetTime) {
    const totalDaylight = sunsetTime.getTime() - sunriseTime.getTime()
    const elapsed = now.getTime() - sunriseTime.getTime()
    daylightProgress = (elapsed / totalDaylight) * 100
  }

  // Calculate time until next sunrise/sunset
  let nextEvent = ''
  let timeUntilNext = ''
  if (isDay) {
    const timeUntilSunset = sunsetTime.getTime() - now.getTime()
    const hours = Math.floor(timeUntilSunset / (1000 * 60 * 60))
    const minutes = Math.floor((timeUntilSunset % (1000 * 60 * 60)) / (1000 * 60))
    nextEvent = 'Sunset'
    timeUntilNext = `${hours}h ${minutes}m`
  } else {
    // Calculate next sunrise (either today if before sunrise, or tomorrow)
    let nextSunrise = new Date(sunrise)
    if (now > sunsetTime) {
      nextSunrise.setDate(nextSunrise.getDate() + 1)
    }
    const timeUntilSunrise = nextSunrise.getTime() - now.getTime()
    const hours = Math.floor(timeUntilSunrise / (1000 * 60 * 60))
    const minutes = Math.floor((timeUntilSunrise % (1000 * 60 * 60)) / (1000 * 60))
    nextEvent = 'Sunrise'
    timeUntilNext = `${hours}h ${minutes}m`
  }

  // Convert seconds to hours and minutes
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  // Calculate sun altitude (simplified)
  const getSunPhase = () => {
    const hour = now.getHours()
    if (hour < 6 || hour > 20) return { phase: 'Night', icon: '🌙', color: 'text-indigo-600' }
    if (hour < 8 || hour > 18) return { phase: 'Twilight', icon: '🌅', color: 'text-orange-600' }
    if (hour >= 11 && hour <= 15) return { phase: 'High Sun', icon: '☀️', color: 'text-yellow-600' }
    return { phase: 'Daylight', icon: '🌤️', color: 'text-blue-600' }
  }

  const sunPhase = getSunPhase()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <span>🌅</span>
          Astronomy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Sun Phase */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Current Phase</span>
            <span className="text-2xl">{sunPhase.icon}</span>
          </div>
          <div className={`text-lg font-bold ${sunPhase.color}`}>
            {sunPhase.phase}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {isDay ? '☀️ Day' : '🌙 Night'}
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🌅</span>
              <span className="font-medium text-orange-900">Sunrise</span>
            </div>
            <div className="text-lg font-bold text-orange-800">
              {formatTime(sunrise)}
            </div>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🌇</span>
              <span className="font-medium text-purple-900">Sunset</span>
            </div>
            <div className="text-lg font-bold text-purple-800">
              {formatTime(sunset)}
            </div>
          </div>
        </div>

        {/* Next Event Countdown */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-blue-900">Next {nextEvent}</span>
            <span className="text-blue-700">{isDay ? '🌇' : '🌅'}</span>
          </div>
          <div className="text-lg font-bold text-blue-800">
            {timeUntilNext}
          </div>
        </div>

        {/* Daylight Progress */}
        {isDay && (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-yellow-900">Daylight Progress</span>
              <span className="text-yellow-700">{Math.round(daylightProgress)}%</span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2 mb-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${daylightProgress}%` }}
              ></div>
            </div>
            <div className="text-sm text-yellow-700">
              {daylightProgress < 50 ? 'Morning' : 'Afternoon'}
            </div>
          </div>
        )}

        {/* Duration Information */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              <span className="font-medium">Daylight Duration</span>
            </div>
            <span className="font-bold text-gray-900">
              {formatDuration(daylightDuration)}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-lg">☀️</span>
              <span className="font-medium">Sunshine Duration</span>
            </div>
            <span className="font-bold text-gray-900">
              {formatDuration(sunshineDuration)}
            </span>
          </div>
        </div>

        {/* Sunshine Percentage */}
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-green-900">Sunshine Efficiency</span>
            <span className="text-green-700">
              {Math.round((sunshineDuration / daylightDuration) * 100)}%
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2 mb-2">
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${(sunshineDuration / daylightDuration) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm text-green-700">
            {(sunshineDuration / daylightDuration) > 0.7 ? 'Mostly sunny' : 
             (sunshineDuration / daylightDuration) > 0.4 ? 'Partly sunny' : 'Mostly cloudy'}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 