'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  HistoricalData, 
  getWeatherInfo, 
  formatTemperature, 
  formatDate, 
  formatPrecipitation,
  formatWindSpeed,
  getWindDirection,
  windDirections
} from '@/lib/weather-utils'

interface WeatherHistoryProps {
  historicalData: HistoricalData
}

export default function WeatherHistory({ historicalData }: WeatherHistoryProps) {
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary')
  
  const daily = historicalData.daily
  
  // Process historical data for analysis
  const historicalDays = daily.time.map((time, index) => ({
    date: time,
    weatherCode: daily.weather_code[index],
    tempMax: daily.temperature_2m_max[index],
    tempMin: daily.temperature_2m_min[index],
    tempMean: daily.temperature_2m_mean[index],
    precipitation: daily.precipitation_sum[index],
    rain: daily.rain_sum[index],
    snowfall: daily.snowfall_sum[index],
    windSpeedMax: daily.wind_speed_10m_max[index],
    windGustsMax: daily.wind_gusts_10m_max[index],
    windDirection: daily.wind_direction_10m_dominant[index]
  }))

  // Calculate week statistics
  const weekStats = {
    avgTempMax: historicalDays.reduce((sum, day) => sum + day.tempMax, 0) / historicalDays.length,
    avgTempMin: historicalDays.reduce((sum, day) => sum + day.tempMin, 0) / historicalDays.length,
    totalPrecipitation: historicalDays.reduce((sum, day) => sum + day.precipitation, 0),
    totalRain: historicalDays.reduce((sum, day) => sum + day.rain, 0),
    totalSnow: historicalDays.reduce((sum, day) => sum + day.snowfall, 0),
    maxWindSpeed: Math.max(...historicalDays.map(day => day.windSpeedMax)),
    rainyDays: historicalDays.filter(day => day.rain > 0.1).length,
    snowyDays: historicalDays.filter(day => day.snowfall > 0.1).length,
    hottestDay: historicalDays.reduce((max, day) => day.tempMax > max.tempMax ? day : max, historicalDays[0]),
    coldestDay: historicalDays.reduce((min, day) => day.tempMin < min.tempMin ? day : min, historicalDays[0])
  }

  // Weather pattern analysis
  const weatherPatterns = {
    mostCommonCondition: (() => {
      const conditionCounts: Record<number, number> = {}
      historicalDays.forEach(day => {
        conditionCounts[day.weatherCode] = (conditionCounts[day.weatherCode] || 0) + 1
      })
      const mostCommon = Object.entries(conditionCounts).reduce((a, b) => 
        conditionCounts[parseInt(a[0])] > conditionCounts[parseInt(b[0])] ? a : b
      )
      return { code: parseInt(mostCommon[0]), days: mostCommon[1] }
    })(),
    temperatureTrend: (() => {
      const recent3Days = historicalDays.slice(-3).reduce((sum, day) => sum + day.tempMean, 0) / 3
      const earlier3Days = historicalDays.slice(0, 3).reduce((sum, day) => sum + day.tempMean, 0) / 3
      const diff = recent3Days - earlier3Days
      if (diff > 2) return { trend: 'warming', change: diff }
      if (diff < -2) return { trend: 'cooling', change: Math.abs(diff) }
      return { trend: 'stable', change: Math.abs(diff) }
    })()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span>📈</span>
            Weather History (Past 7 Days)
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'summary' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('summary')}
            >
              Summary
            </Button>
            <Button
              variant={viewMode === 'detailed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('detailed')}
            >
              Daily Details
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {viewMode === 'summary' ? (
          <>
            {/* Week Overview Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg">
                <div className="text-sm text-gray-600">Average High</div>
                <div className="text-2xl font-bold text-red-600">
                  {formatTemperature(weekStats.avgTempMax)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Peak: {formatTemperature(weekStats.hottestDay.tempMax)}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                <div className="text-sm text-gray-600">Average Low</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatTemperature(weekStats.avgTempMin)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Lowest: {formatTemperature(weekStats.coldestDay.tempMin)}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                <div className="text-sm text-gray-600">Total Precipitation</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatPrecipitation(weekStats.totalPrecipitation)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {weekStats.rainyDays} rainy days
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                <div className="text-sm text-gray-600">Max Wind</div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatWindSpeed(weekStats.maxWindSpeed)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Peak gusts recorded
                </div>
              </div>
            </div>

            {/* Weather Patterns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 mb-3">Weather Patterns</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Most Common</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getWeatherInfo(weatherPatterns.mostCommonCondition.code).icon}</span>
                      <span className="text-sm font-medium">
                        {getWeatherInfo(weatherPatterns.mostCommonCondition.code).condition}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Appeared</span>
                    <span className="text-sm font-medium">
                      {weatherPatterns.mostCommonCondition.days}/{historicalDays.length} days
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Temperature Trend</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium capitalize">
                        {weatherPatterns.temperatureTrend.trend}
                      </span>
                      {weatherPatterns.temperatureTrend.trend === 'warming' && '📈'}
                      {weatherPatterns.temperatureTrend.trend === 'cooling' && '📉'}
                      {weatherPatterns.temperatureTrend.trend === 'stable' && '📊'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900 mb-3">Precipitation Summary</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Total Rain</span>
                    <span className="text-sm font-medium text-blue-900">
                      {formatPrecipitation(weekStats.totalRain)}
                    </span>
                  </div>
                  {weekStats.totalSnow > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">Total Snow</span>
                      <span className="text-sm font-medium text-blue-900">
                        {weekStats.totalSnow.toFixed(1)} cm
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Rainy Days</span>
                    <span className="text-sm font-medium text-blue-900">
                      {weekStats.rainyDays}/{historicalDays.length}
                    </span>
                  </div>
                  {weekStats.snowyDays > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">Snowy Days</span>
                      <span className="text-sm font-medium text-blue-900">
                        {weekStats.snowyDays}/{historicalDays.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notable Days */}
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-900 mb-3">📅 Notable Days</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white rounded">
                  <div className="font-medium text-red-700">🌡️ Hottest Day</div>
                  <div className="text-gray-600">
                    {formatDate(weekStats.hottestDay.date)} - {formatTemperature(weekStats.hottestDay.tempMax)}
                  </div>
                </div>
                <div className="p-3 bg-white rounded">
                  <div className="font-medium text-blue-700">❄️ Coldest Day</div>
                  <div className="text-gray-600">
                    {formatDate(weekStats.coldestDay.date)} - {formatTemperature(weekStats.coldestDay.tempMin)}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Detailed Daily View */}
            <div className="space-y-3">
              {historicalDays.map((day, index) => {
                const weatherInfo = getWeatherInfo(day.weatherCode)
                const windDir = getWindDirection(day.windDirection)
                const windArrow = windDirections[windDir]
                const isToday = index === historicalDays.length - 1

                return (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center">
                      {/* Date */}
                      <div className="lg:col-span-1">
                        <div className="font-medium text-sm">
                          {isToday ? 'Today' : formatDate(day.date)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(day.date).toLocaleDateString('en-CA', { weekday: 'short' })}
                        </div>
                      </div>

                      {/* Weather */}
                      <div className="lg:col-span-1 text-center">
                        <div className="text-2xl mb-1">{weatherInfo.icon}</div>
                        <div className="text-xs text-gray-600 leading-tight">
                          {weatherInfo.condition}
                        </div>
                      </div>

                      {/* Temperature */}
                      <div className="lg:col-span-1 text-center">
                        <div className="text-lg font-bold">
                          {formatTemperature(day.tempMax)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTemperature(day.tempMin)}
                        </div>
                        <div className="text-xs text-gray-400">
                          Avg: {formatTemperature(day.tempMean)}
                        </div>
                      </div>

                      {/* Precipitation */}
                      <div className="lg:col-span-1 text-center">
                        {day.precipitation > 0 ? (
                          <div>
                            <div className="text-sm font-medium text-blue-600">
                              {formatPrecipitation(day.precipitation)}
                            </div>
                            {day.rain > 0 && (
                              <div className="text-xs text-gray-500">
                                Rain: {formatPrecipitation(day.rain)}
                              </div>
                            )}
                            {day.snowfall > 0 && (
                              <div className="text-xs text-gray-500">
                                Snow: {day.snowfall.toFixed(1)} cm
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">No precip</div>
                        )}
                      </div>

                      {/* Wind */}
                      <div className="lg:col-span-1 text-center">
                        <div className="text-sm font-medium flex items-center justify-center gap-1">
                          <span>{windArrow}</span>
                          <span>{formatWindSpeed(day.windSpeedMax)}</span>
                        </div>
                        <div className="text-xs text-gray-500">{windDir}</div>
                        {day.windGustsMax > day.windSpeedMax * 1.2 && (
                          <div className="text-xs text-orange-600">
                            Gusts: {formatWindSpeed(day.windGustsMax)}
                          </div>
                        )}
                      </div>

                      {/* Comparison */}
                      <div className="lg:col-span-2 text-right">
                        <div className="text-xs text-gray-500 space-y-1">
                          {day.tempMax > weekStats.avgTempMax + 3 && (
                            <div className="text-red-600">🔥 Much warmer than average</div>
                          )}
                          {day.tempMax < weekStats.avgTempMax - 3 && (
                            <div className="text-blue-600">❄️ Much cooler than average</div>
                          )}
                          {day.precipitation > 10 && (
                            <div className="text-blue-600">🌧️ Heavy precipitation</div>
                          )}
                          {day.windSpeedMax > 40 && (
                            <div className="text-purple-600">💨 Strong winds</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* Historical Context */}
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="font-medium text-green-900 mb-2">📊 Weekly Analysis</div>
          <div className="text-sm text-green-800 space-y-1">
            <p>• Average temperature range: {formatTemperature(weekStats.avgTempMin)} to {formatTemperature(weekStats.avgTempMax)}</p>
            <p>• Total precipitation this week: {formatPrecipitation(weekStats.totalPrecipitation)} across {weekStats.rainyDays} days</p>
            <p>• Temperature trend: {weatherPatterns.temperatureTrend.trend} by {weatherPatterns.temperatureTrend.change.toFixed(1)}°C</p>
            <p>• Most common weather: {getWeatherInfo(weatherPatterns.mostCommonCondition.code).condition} ({weatherPatterns.mostCommonCondition.days} days)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 