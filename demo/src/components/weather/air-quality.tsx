import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AirQualityData, getAQILevel } from '@/lib/weather-utils'

interface AirQualityProps {
  airQualityData: AirQualityData
}

export default function AirQuality({ airQualityData }: AirQualityProps) {
  const current = airQualityData.current
  
  // Helper function to safely format numbers with fallback
  const safeToFixed = (value: number | null | undefined, decimals: number = 1, fallback: string = 'N/A'): string => {
    if (value === null || value === undefined || isNaN(value)) {
      return fallback
    }
    return value.toFixed(decimals)
  }

  // Safely get AQI with fallback
  const aqiValue = current.us_aqi ?? 0
  const aqiInfo = getAQILevel(aqiValue)

  // Pollutant information with descriptions and health effects
  const pollutants = [
    {
      name: 'PM2.5',
      value: safeToFixed(current.pm2_5),
      unit: 'μg/m³',
      icon: '🔸',
      description: 'Fine particles',
      getLevel: (value: number) => {
        if (value <= 12) return { level: 'Good', color: 'text-green-600' }
        if (value <= 35) return { level: 'Moderate', color: 'text-yellow-600' }
        if (value <= 55) return { level: 'Unhealthy for Sensitive', color: 'text-orange-600' }
        if (value <= 150) return { level: 'Unhealthy', color: 'text-red-600' }
        return { level: 'Very Unhealthy', color: 'text-purple-600' }
      }
    },
    {
      name: 'PM10',
      value: safeToFixed(current.pm10),
      unit: 'μg/m³',
      icon: '🔹',
      description: 'Coarse particles',
      getLevel: (value: number) => {
        if (value <= 54) return { level: 'Good', color: 'text-green-600' }
        if (value <= 154) return { level: 'Moderate', color: 'text-yellow-600' }
        if (value <= 254) return { level: 'Unhealthy for Sensitive', color: 'text-orange-600' }
        if (value <= 354) return { level: 'Unhealthy', color: 'text-red-600' }
        return { level: 'Very Unhealthy', color: 'text-purple-600' }
      }
    },
    {
      name: 'NO₂',
      value: safeToFixed(current.nitrogen_dioxide),
      unit: 'μg/m³',
      icon: '🟤',
      description: 'Nitrogen dioxide',
      getLevel: (value: number) => {
        if (value <= 100) return { level: 'Good', color: 'text-green-600' }
        if (value <= 200) return { level: 'Moderate', color: 'text-yellow-600' }
        if (value <= 400) return { level: 'Unhealthy for Sensitive', color: 'text-orange-600' }
        return { level: 'Unhealthy', color: 'text-red-600' }
      }
    },
    {
      name: 'O₃',
      value: safeToFixed(current.ozone),
      unit: 'μg/m³',
      icon: '🔵',
      description: 'Ozone',
      getLevel: (value: number) => {
        if (value <= 120) return { level: 'Good', color: 'text-green-600' }
        if (value <= 240) return { level: 'Moderate', color: 'text-yellow-600' }
        if (value <= 360) return { level: 'Unhealthy for Sensitive', color: 'text-orange-600' }
        return { level: 'Unhealthy', color: 'text-red-600' }
      }
    },
    {
      name: 'SO₂',
      value: safeToFixed(current.sulphur_dioxide),
      unit: 'μg/m³',
      icon: '🟡',
      description: 'Sulfur dioxide',
      getLevel: (value: number) => {
        if (value <= 75) return { level: 'Good', color: 'text-green-600' }
        if (value <= 185) return { level: 'Moderate', color: 'text-yellow-600' }
        if (value <= 304) return { level: 'Unhealthy for Sensitive', color: 'text-orange-600' }
        return { level: 'Unhealthy', color: 'text-red-600' }
      }
    },
    {
      name: 'CO',
      value: current.carbon_monoxide ? safeToFixed(current.carbon_monoxide / 1000, 2) : 'N/A',
      unit: 'mg/m³',
      icon: '⚫',
      description: 'Carbon monoxide',
      getLevel: (value: number) => {
        if (value <= 10) return { level: 'Good', color: 'text-green-600' }
        if (value <= 20) return { level: 'Moderate', color: 'text-yellow-600' }
        if (value <= 35) return { level: 'Unhealthy for Sensitive', color: 'text-orange-600' }
        return { level: 'Unhealthy', color: 'text-red-600' }
      }
    }
  ]

  // Additional air quality metrics
  const additionalMetrics = [
    {
      name: 'Ammonia',
      value: safeToFixed(current.ammonia),
      unit: 'μg/m³',
      icon: '🔶',
      description: 'Agricultural & industrial pollutant'
    },
    {
      name: 'Dust',
      value: safeToFixed(current.dust),
      unit: 'μg/m³',
      icon: '🌫️',
      description: 'Dust concentration'
    },
    {
      name: 'Aerosol Optical Depth',
      value: safeToFixed(current.aerosol_optical_depth, 3),
      unit: '',
      icon: '🌥️',
      description: 'Atmospheric haze measure'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <span>🌬️</span>
          Air Quality
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall AQI */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm font-medium text-gray-900">US Air Quality Index</div>
              <div className={`text-2xl font-bold ${aqiInfo.color}`}>
                {aqiValue > 0 ? Math.round(aqiValue) : 'N/A'}
              </div>
              <div className={`text-sm font-medium ${aqiInfo.color}`}>
                {aqiInfo.level}
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-2">
                {aqiValue <= 50 ? '😊' : 
                 aqiValue <= 100 ? '😐' : 
                 aqiValue <= 150 ? '😷' : 
                 aqiValue <= 200 ? '😨' : '☠️'}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {aqiInfo.advice}
          </div>
        </div>

        {/* Main Pollutants */}
        <div>
          <h3 className="text-md font-semibold mb-3">Primary Pollutants</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pollutants.map((pollutant, index) => {
              const numericValue = pollutant.value === 'N/A' ? 0 : parseFloat(pollutant.value)
              const level = pollutant.getLevel(numericValue)
              return (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{pollutant.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{pollutant.name}</div>
                        <div className="text-xs text-gray-600">{pollutant.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">
                        {pollutant.value} {pollutant.value !== 'N/A' ? pollutant.unit : ''}
                      </div>
                      {pollutant.value !== 'N/A' && (
                        <div className={`text-xs font-medium ${level.color}`}>
                          {level.level}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Additional Metrics */}
        <div>
          <h3 className="text-md font-semibold mb-3">Additional Metrics</h3>
          <div className="space-y-2">
            {additionalMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{metric.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{metric.name}</div>
                    <div className="text-xs text-gray-600">{metric.description}</div>
                  </div>
                </div>
                <div className="text-sm font-bold">
                  {metric.value} {metric.value !== 'N/A' ? metric.unit : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Recommendations */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚠️</span>
            <span className="font-medium text-yellow-900">Health Recommendations</span>
          </div>
          <div className="text-sm text-yellow-800 space-y-1">
            {aqiValue <= 50 && (
              <>
                <p>• Air quality is satisfactory for most people</p>
                <p>• Ideal conditions for outdoor activities</p>
              </>
            )}
            {aqiValue > 50 && aqiValue <= 100 && (
              <>
                <p>• Air quality is acceptable for most people</p>
                <p>• Sensitive individuals may experience minor issues</p>
              </>
            )}
            {aqiValue > 100 && aqiValue <= 150 && (
              <>
                <p>• Sensitive groups should limit prolonged outdoor activities</p>
                <p>• Consider wearing a mask if you're sensitive to air pollution</p>
              </>
            )}
            {aqiValue > 150 && aqiValue <= 200 && (
              <>
                <p>• Everyone should reduce prolonged outdoor exertion</p>
                <p>• Sensitive groups should avoid outdoor activities</p>
                <p>• Consider wearing an N95 mask outdoors</p>
              </>
            )}
            {aqiValue > 200 && (
              <>
                <p>• Everyone should avoid outdoor activities</p>
                <p>• Stay indoors with windows closed</p>
                <p>• Use air purifiers if available</p>
                <p>• Seek medical attention if experiencing symptoms</p>
              </>
            )}
            {aqiValue === 0 && (
              <>
                <p>• Air quality data is currently unavailable</p>
                <p>• Use caution and check local air quality reports</p>
              </>
            )}
          </div>
        </div>

        {/* AQI Scale Reference */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="font-medium text-sm mb-3 text-gray-900">AQI Scale Reference</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>0-50 Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>51-100 Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>101-150 Unhealthy for Sensitive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>151-200 Unhealthy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>201-300 Very Unhealthy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-800 rounded-full"></div>
              <span>301+ Hazardous</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 