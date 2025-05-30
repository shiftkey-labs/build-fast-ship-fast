import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  WeatherData, 
  getWeatherInfo, 
  formatTemperature, 
  formatWindSpeed, 
  formatPressure, 
  formatHumidity, 
  formatVisibility,
  getWindDirection,
  windDirections,
  getComfortLevel,
  formatDateTime
} from '@/lib/weather-utils'

interface WeatherOverviewProps {
  weatherData: WeatherData
}

export default function WeatherOverview({ weatherData }: WeatherOverviewProps) {
  const current = weatherData.current
  const weatherInfo = getWeatherInfo(current.weather_code)
  const windDir = getWindDirection(current.wind_direction_10m)
  const windArrow = windDirections[windDir]
  const comfort = getComfortLevel(current.temperature_2m, current.relative_humidity_2m, current.wind_speed_10m)
  
  const isDay = current.is_day === 1

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 ${isDay ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600' : 'bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-900'}`} />
      <div className="relative z-10">
        <CardHeader className="text-white">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">Current Conditions</CardTitle>
              <CardDescription className="text-blue-100">
                {formatDateTime(current.time)}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-6xl mb-2">{weatherInfo.icon}</div>
              <div className="text-sm text-blue-100">{isDay ? '☀️ Day' : '🌙 Night'}</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="text-white space-y-6">
          {/* Temperature Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-6xl font-bold mb-2">
                {formatTemperature(current.temperature_2m)}
              </div>
              <div className="text-xl text-blue-100 mb-1">
                Feels like {formatTemperature(current.apparent_temperature)}
              </div>
              <div className="text-lg font-semibold mb-2">
                {weatherInfo.condition}
              </div>
              <div className="text-sm text-blue-100">
                {weatherInfo.description}
              </div>
              
              {/* Comfort Level */}
              <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-sm font-medium">Comfort Level</div>
                <div className={`text-lg font-bold ${comfort.color.replace('text-', 'text-white')}`}>
                  {comfort.level}
                </div>
                <div className="text-xs text-blue-100">
                  {comfort.description}
                </div>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <div className="text-blue-100 text-xs uppercase tracking-wide">Humidity</div>
                <div className="text-xl font-bold">{formatHumidity(current.relative_humidity_2m)}</div>
              </div>
              
              <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <div className="text-blue-100 text-xs uppercase tracking-wide">Pressure</div>
                <div className="text-xl font-bold">{formatPressure(current.pressure_msl)}</div>
              </div>
              
              <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <div className="text-blue-100 text-xs uppercase tracking-wide">Wind</div>
                <div className="text-xl font-bold flex items-center gap-1">
                  <span>{windArrow}</span>
                  <span>{formatWindSpeed(current.wind_speed_10m)}</span>
                </div>
                <div className="text-xs text-blue-100">{windDir}</div>
              </div>
              
              <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <div className="text-blue-100 text-xs uppercase tracking-wide">Visibility</div>
                <div className="text-xl font-bold">{formatVisibility(current.visibility)}</div>
              </div>
              
              <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <div className="text-blue-100 text-xs uppercase tracking-wide">UV Index</div>
                <div className="text-xl font-bold">{current.uv_index.toFixed(1)}</div>
              </div>
              
              <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <div className="text-blue-100 text-xs uppercase tracking-wide">Cloud Cover</div>
                <div className="text-xl font-bold">{current.cloud_cover}%</div>
              </div>
            </div>
          </div>

          {/* Precipitation Section */}
          {(current.precipitation > 0 || current.rain > 0 || current.showers > 0 || current.snowfall > 0) && (
            <div className="border-t border-white/20 pt-4">
              <div className="text-lg font-semibold mb-3">Current Precipitation</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {current.precipitation > 0 && (
                  <div className="bg-white/10 p-2 rounded backdrop-blur-sm">
                    <div className="text-blue-100 text-xs">Total</div>
                    <div className="font-bold">{current.precipitation.toFixed(1)} mm</div>
                  </div>
                )}
                {current.rain > 0 && (
                  <div className="bg-white/10 p-2 rounded backdrop-blur-sm">
                    <div className="text-blue-100 text-xs">Rain</div>
                    <div className="font-bold">{current.rain.toFixed(1)} mm</div>
                  </div>
                )}
                {current.showers > 0 && (
                  <div className="bg-white/10 p-2 rounded backdrop-blur-sm">
                    <div className="text-blue-100 text-xs">Showers</div>
                    <div className="font-bold">{current.showers.toFixed(1)} mm</div>
                  </div>
                )}
                {current.snowfall > 0 && (
                  <div className="bg-white/10 p-2 rounded backdrop-blur-sm">
                    <div className="text-blue-100 text-xs">Snow</div>
                    <div className="font-bold">{current.snowfall.toFixed(1)} cm</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Wind Details */}
          {current.wind_gusts_10m > current.wind_speed_10m * 1.2 && (
            <div className="border-t border-white/20 pt-4">
              <div className="text-lg font-semibold mb-2">Wind Information</div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-white/10 p-2 rounded backdrop-blur-sm">
                  <div className="text-blue-100 text-xs">Speed</div>
                  <div className="font-bold">{formatWindSpeed(current.wind_speed_10m)}</div>
                </div>
                <div className="bg-white/10 p-2 rounded backdrop-blur-sm">
                  <div className="text-blue-100 text-xs">Gusts</div>
                  <div className="font-bold">{formatWindSpeed(current.wind_gusts_10m)}</div>
                </div>
                <div className="bg-white/10 p-2 rounded backdrop-blur-sm">
                  <div className="text-blue-100 text-xs">Direction</div>
                  <div className="font-bold">{windDir} {windArrow}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  )
} 