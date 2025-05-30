'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  WeatherData, 
  getWeatherInfo, 
  formatTemperature, 
  formatDate, 
  formatTime, 
  formatPrecipitation,
  formatWindSpeed,
  getWindDirection,
  windDirections
} from '@/lib/weather-utils'

interface WeatherForecastProps {
  weatherData: WeatherData
}

export default function WeatherForecast({ weatherData }: WeatherForecastProps) {
  const [activeTab, setActiveTab] = useState<'hourly' | 'daily'>('hourly')
  
  // Get next 24 hours for hourly forecast
  const next24Hours = weatherData.hourly.time.slice(0, 24).map((time, index) => ({
    time,
    temperature: weatherData.hourly.temperature_2m[index],
    weatherCode: weatherData.hourly.weather_code[index],
    precipitationProbability: weatherData.hourly.precipitation_probability[index],
    precipitation: weatherData.hourly.precipitation[index],
    windSpeed: weatherData.hourly.wind_speed_10m[index],
    windDirection: weatherData.hourly.wind_direction_10m[index],
    humidity: weatherData.hourly.relative_humidity_2m[index],
    uvIndex: weatherData.hourly.uv_index[index]
  }))

  // Get next 7 days for daily forecast
  const next7Days = weatherData.daily.time.slice(0, 7).map((time, index) => ({
    time,
    weatherCode: weatherData.daily.weather_code[index],
    tempMax: weatherData.daily.temperature_2m_max[index],
    tempMin: weatherData.daily.temperature_2m_min[index],
    precipitationSum: weatherData.daily.precipitation_sum[index],
    precipitationProbability: weatherData.daily.precipitation_probability_max[index],
    windSpeedMax: weatherData.daily.wind_speed_10m_max[index],
    windDirection: weatherData.daily.wind_direction_10m_dominant[index],
    uvIndexMax: weatherData.daily.uv_index_max[index],
    sunrise: weatherData.daily.sunrise[index],
    sunset: weatherData.daily.sunset[index]
  }))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Weather Forecast</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'hourly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('hourly')}
            >
              Hourly
            </Button>
            <Button
              variant={activeTab === 'daily' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('daily')}
            >
              Daily
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {activeTab === 'hourly' ? (
          <div className="space-y-3">
            <div className="text-sm text-gray-600 mb-4">Next 24 hours</div>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {next24Hours.map((hour, index) => {
                const weatherInfo = getWeatherInfo(hour.weatherCode)
                const windDir = getWindDirection(hour.windDirection)
                const windArrow = windDirections[windDir]
                const hourTime = new Date(hour.time)
                const isNow = index === 0

                return (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${isNow ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} hover:bg-gray-100 transition-colors`}
                  >
                    <div className="grid grid-cols-6 gap-4 items-center">
                      {/* Time */}
                      <div className="text-sm">
                        <div className="font-medium">
                          {isNow ? 'Now' : formatTime(hour.time)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(hour.time)}
                        </div>
                      </div>

                      {/* Weather Icon & Condition */}
                      <div className="text-center">
                        <div className="text-2xl mb-1">{weatherInfo.icon}</div>
                        <div className="text-xs text-gray-600 leading-tight">
                          {weatherInfo.condition.split(' ').slice(0, 2).join(' ')}
                        </div>
                      </div>

                      {/* Temperature */}
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          {formatTemperature(hour.temperature)}
                        </div>
                        <div className="text-xs text-gray-500">
                          UV {hour.uvIndex.toFixed(1)}
                        </div>
                      </div>

                      {/* Precipitation */}
                      <div className="text-center">
                        <div className="text-sm font-medium text-blue-600">
                          {hour.precipitationProbability}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {hour.precipitation > 0 ? formatPrecipitation(hour.precipitation) : 'No rain'}
                        </div>
                      </div>

                      {/* Wind */}
                      <div className="text-center">
                        <div className="text-sm font-medium flex items-center justify-center gap-1">
                          <span>{windArrow}</span>
                          <span>{formatWindSpeed(hour.windSpeed)}</span>
                        </div>
                        <div className="text-xs text-gray-500">{windDir}</div>
                      </div>

                      {/* Humidity */}
                      <div className="text-center">
                        <div className="text-sm font-medium text-cyan-600">
                          {Math.round(hour.humidity)}%
                        </div>
                        <div className="text-xs text-gray-500">Humidity</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-gray-600 mb-4">7-day outlook</div>
            <div className="space-y-3">
              {next7Days.map((day, index) => {
                const weatherInfo = getWeatherInfo(day.weatherCode)
                const windDir = getWindDirection(day.windDirection)
                const windArrow = windDirections[windDir]
                const isToday = index === 0

                return (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} hover:bg-gray-100 transition-colors`}
                  >
                    <div className="grid grid-cols-7 gap-4 items-center">
                      {/* Day */}
                      <div className="text-sm">
                        <div className="font-medium">
                          {isToday ? 'Today' : formatDate(day.time)}
                        </div>
                      </div>

                      {/* Weather Icon & Condition */}
                      <div className="text-center">
                        <div className="text-3xl mb-1">{weatherInfo.icon}</div>
                        <div className="text-xs text-gray-600 leading-tight">
                          {weatherInfo.condition}
                        </div>
                      </div>

                      {/* Temperature Range */}
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          {formatTemperature(day.tempMax)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTemperature(day.tempMin)}
                        </div>
                      </div>

                      {/* Precipitation */}
                      <div className="text-center">
                        <div className="text-sm font-medium text-blue-600">
                          {day.precipitationProbability}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {day.precipitationSum > 0 ? formatPrecipitation(day.precipitationSum) : 'No rain'}
                        </div>
                      </div>

                      {/* Wind */}
                      <div className="text-center">
                        <div className="text-sm font-medium flex items-center justify-center gap-1">
                          <span>{windArrow}</span>
                          <span>{formatWindSpeed(day.windSpeedMax)}</span>
                        </div>
                        <div className="text-xs text-gray-500">{windDir}</div>
                      </div>

                      {/* UV Index */}
                      <div className="text-center">
                        <div className="text-sm font-medium text-orange-600">
                          {day.uvIndexMax.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">UV Max</div>
                      </div>

                      {/* Sunrise/Sunset */}
                      <div className="text-center">
                        <div className="text-xs text-gray-600">
                          <div>🌅 {formatTime(day.sunrise)}</div>
                          <div>🌇 {formatTime(day.sunset)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 