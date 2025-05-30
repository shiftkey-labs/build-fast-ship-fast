import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import WeatherOverview from '@/components/weather/weather-overview'
import WeatherForecast from '@/components/weather/weather-forecast'
import WeatherMap from '@/components/weather/weather-map'
import WeatherStats from '@/components/weather/weather-stats'
import WeatherAlerts from '@/components/weather/weather-alerts'
import WeatherHistory from '@/components/weather/weather-history'
import AstronomyInfo from '@/components/weather/astronomy-info'
import AirQuality from '@/components/weather/air-quality'

// Halifax coordinates
const HALIFAX_COORDS = {
  latitude: 44.6476,
  longitude: -63.5728,
  timezone: 'America/Halifax'
}

// Fetch current weather and forecast data
async function getWeatherData() {
  const baseUrl = 'https://api.open-meteo.com/v1/forecast'
  const params = new URLSearchParams({
    latitude: HALIFAX_COORDS.latitude.toString(),
    longitude: HALIFAX_COORDS.longitude.toString(),
    timezone: HALIFAX_COORDS.timezone,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
      'uv_index',
      'visibility'
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'snow_depth',
      'weather_code',
      'pressure_msl',
      'surface_pressure',
      'cloud_cover',
      'visibility',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
      'temperature_80m',
      'temperature_120m',
      'temperature_180m',
      'uv_index'
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'daylight_duration',
      'sunshine_duration',
      'uv_index_max',
      'precipitation_sum',
      'rain_sum',
      'showers_sum',
      'snowfall_sum',
      'precipitation_hours',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant',
      'shortwave_radiation_sum',
      'et0_fao_evapotranspiration'
    ].join(','),
    forecast_days: '14'
  })

  const response = await fetch(`${baseUrl}?${params}`, {
    next: { revalidate: 300 } // Revalidate every 5 minutes
  })

  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }

  return response.json()
}

// Fetch air quality data
async function getAirQualityData() {
  const baseUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality'
  const params = new URLSearchParams({
    latitude: HALIFAX_COORDS.latitude.toString(),
    longitude: HALIFAX_COORDS.longitude.toString(),
    current: [
      'us_aqi',
      'pm10',
      'pm2_5',
      'carbon_monoxide',
      'nitrogen_dioxide',
      'sulphur_dioxide',
      'ozone',
      'aerosol_optical_depth',
      'dust',
      'uv_index',
      'ammonia'
    ].join(','),
    hourly: [
      'pm10',
      'pm2_5',
      'carbon_monoxide',
      'nitrogen_dioxide',
      'sulphur_dioxide',
      'ozone',
      'aerosol_optical_depth',
      'dust',
      'uv_index',
      'ammonia',
      'us_aqi'
    ].join(','),
    domains: 'auto',
    forecast_days: '5'
  })

  const response = await fetch(`${baseUrl}?${params}`, {
    next: { revalidate: 600 } // Revalidate every 10 minutes
  })

  if (!response.ok) {
    throw new Error('Failed to fetch air quality data')
  }

  return response.json()
}

// Fetch historical weather data
async function getHistoricalData() {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - 7) // Last 7 days

  const baseUrl = 'https://archive-api.open-meteo.com/v1/archive'
  const params = new URLSearchParams({
    latitude: HALIFAX_COORDS.latitude.toString(),
    longitude: HALIFAX_COORDS.longitude.toString(),
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0],
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'temperature_2m_mean',
      'precipitation_sum',
      'rain_sum',
      'snowfall_sum',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant'
    ].join(','),
    timezone: HALIFAX_COORDS.timezone
  })

  const response = await fetch(`${baseUrl}?${params}`, {
    next: { revalidate: 3600 } // Revalidate every hour
  })

  if (!response.ok) {
    throw new Error('Failed to fetch historical data')
  }

  return response.json()
}

// Loading components
function WeatherSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-4">
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function WeatherPage() {
  // Fetch all data in parallel
  const [weatherData, airQualityData, historicalData] = await Promise.all([
    getWeatherData(),
    getAirQualityData(),
    getHistoricalData()
  ])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Halifax Weather Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Real-time weather conditions and forecast for Halifax, Nova Scotia
        </p>
      </div>

      <Suspense fallback={<WeatherSkeleton />}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather Overview */}
          <div className="lg:col-span-2">
            <WeatherOverview weatherData={weatherData} />
          </div>

          {/* Weather Stats */}
          <div className="space-y-6">
            <WeatherStats weatherData={weatherData} />
            <AstronomyInfo weatherData={weatherData} />
          </div>
        </div>

        {/* Weather Alerts */}
        <WeatherAlerts weatherData={weatherData} />

        {/* Air Quality */}
        <AirQuality airQualityData={airQualityData} />

        {/* Forecast and Map Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Forecast */}
          <WeatherForecast weatherData={weatherData} />
          
          {/* Weather Map */}
          <WeatherMap coords={HALIFAX_COORDS} />
        </div>

        {/* Historical Data */}
        <WeatherHistory historicalData={historicalData} />
      </Suspense>
    </div>
  )
}

export const metadata = {
  title: 'Halifax Weather Dashboard',
  description: 'Real-time weather conditions and forecast for Halifax, Nova Scotia',
} 