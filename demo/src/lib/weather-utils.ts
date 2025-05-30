// Weather condition codes mapping
export const weatherCodes: Record<number, { condition: string; icon: string; description: string }> = {
  0: { condition: 'Clear sky', icon: '☀️', description: 'Sunny and bright' },
  1: { condition: 'Mainly clear', icon: '🌤️', description: 'Mostly sunny with some clouds' },
  2: { condition: 'Partly cloudy', icon: '⛅', description: 'Mix of sun and clouds' },
  3: { condition: 'Overcast', icon: '☁️', description: 'Cloudy skies' },
  45: { condition: 'Fog', icon: '🌫️', description: 'Foggy conditions' },
  48: { condition: 'Depositing rime fog', icon: '🌫️', description: 'Freezing fog' },
  51: { condition: 'Light drizzle', icon: '🌦️', description: 'Light misty rain' },
  53: { condition: 'Moderate drizzle', icon: '🌦️', description: 'Steady light rain' },
  55: { condition: 'Dense drizzle', icon: '🌧️', description: 'Heavy drizzle' },
  56: { condition: 'Light freezing drizzle', icon: '🌨️', description: 'Light icy drizzle' },
  57: { condition: 'Dense freezing drizzle', icon: '🌨️', description: 'Heavy freezing drizzle' },
  61: { condition: 'Slight rain', icon: '🌧️', description: 'Light rainfall' },
  63: { condition: 'Moderate rain', icon: '🌧️', description: 'Steady rain' },
  65: { condition: 'Heavy rain', icon: '🌧️', description: 'Heavy rainfall' },
  66: { condition: 'Light freezing rain', icon: '🌨️', description: 'Light icy rain' },
  67: { condition: 'Heavy freezing rain', icon: '🌨️', description: 'Heavy freezing rain' },
  71: { condition: 'Slight snow fall', icon: '❄️', description: 'Light snow' },
  73: { condition: 'Moderate snow fall', icon: '❄️', description: 'Steady snowfall' },
  75: { condition: 'Heavy snow fall', icon: '❄️', description: 'Heavy snow' },
  77: { condition: 'Snow grains', icon: '❄️', description: 'Granular snow' },
  80: { condition: 'Slight rain showers', icon: '🌦️', description: 'Light showers' },
  81: { condition: 'Moderate rain showers', icon: '🌦️', description: 'Rain showers' },
  82: { condition: 'Violent rain showers', icon: '⛈️', description: 'Heavy rain showers' },
  85: { condition: 'Slight snow showers', icon: '🌨️', description: 'Light snow showers' },
  86: { condition: 'Heavy snow showers', icon: '🌨️', description: 'Heavy snow showers' },
  95: { condition: 'Thunderstorm', icon: '⛈️', description: 'Thunderstorms' },
  96: { condition: 'Thunderstorm with slight hail', icon: '⛈️', description: 'Thunderstorms with light hail' },
  99: { condition: 'Thunderstorm with heavy hail', icon: '⛈️', description: 'Severe thunderstorms with hail' },
}

// Wind direction mapping
export const windDirections: Record<string, string> = {
  N: '⬇️', NNE: '↙️', NE: '↙️', ENE: '↙️',
  E: '⬅️', ESE: '↖️', SE: '↖️', SSE: '↖️',
  S: '⬆️', SSW: '↗️', SW: '↗️', WSW: '↗️',
  W: '➡️', WNW: '↘️', NW: '↘️', NNW: '↘️'
}

// Temperature utilities
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32
}

export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  if (unit === 'F') {
    return `${Math.round(celsiusToFahrenheit(temp))}°F`
  }
  return `${Math.round(temp)}°C`
}

// Wind utilities
export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed)} km/h`
}

// Pressure utilities
export function formatPressure(pressure: number): string {
  return `${Math.round(pressure)} hPa`
}

// Humidity utilities
export function formatHumidity(humidity: number): string {
  return `${Math.round(humidity)}%`
}

// Visibility utilities
export function formatVisibility(visibility: number): string {
  return `${Math.round(visibility / 1000)} km`
}

// UV Index utilities
export function getUVLevel(uvIndex: number): { level: string; color: string; advice: string } {
  if (uvIndex < 3) return { level: 'Low', color: 'text-green-600', advice: 'No protection needed' }
  if (uvIndex < 6) return { level: 'Moderate', color: 'text-yellow-600', advice: 'Seek shade during midday' }
  if (uvIndex < 8) return { level: 'High', color: 'text-orange-600', advice: 'Protection required' }
  if (uvIndex < 11) return { level: 'Very High', color: 'text-red-600', advice: 'Extra protection required' }
  return { level: 'Extreme', color: 'text-purple-600', advice: 'Avoid outdoor activities' }
}

// Air Quality utilities
export function getAQILevel(aqi: number): { level: string; color: string; advice: string } {
  if (aqi <= 50) return { level: 'Good', color: 'text-green-600', advice: 'Air quality is satisfactory' }
  if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-600', advice: 'Acceptable for most people' }
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'text-orange-600', advice: 'Sensitive people should limit outdoor activities' }
  if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-600', advice: 'Everyone may experience health effects' }
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-600', advice: 'Health alert: everyone may experience serious health effects' }
  return { level: 'Hazardous', color: 'text-red-800', advice: 'Emergency conditions: everyone should avoid outdoor activities' }
}

// Date utilities
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-CA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

// Weather condition utilities
export function getWeatherInfo(code: number) {
  return weatherCodes[code] || { condition: 'Unknown', icon: '❓', description: 'Weather condition unknown' }
}

// Precipitation utilities
export function formatPrecipitation(mm: number): string {
  return `${mm.toFixed(1)} mm`
}

// Calculate heat index
export function calculateHeatIndex(temp: number, humidity: number): number {
  const tempF = celsiusToFahrenheit(temp)
  const hi = -42.379 + 2.04901523 * tempF + 10.14333127 * humidity - 0.22475541 * tempF * humidity - 0.00683783 * tempF * tempF - 0.05481717 * humidity * humidity + 0.00122874 * tempF * tempF * humidity + 0.00085282 * tempF * humidity * humidity - 0.00000199 * tempF * tempF * humidity * humidity
  return (hi - 32) * 5/9 // Convert back to Celsius
}

// Calculate wind chill
export function calculateWindChill(temp: number, windSpeed: number): number {
  if (temp > 10 || windSpeed < 4.8) return temp
  return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)
}

// Comfort level calculation
export function getComfortLevel(temp: number, humidity: number, windSpeed: number): { level: string; color: string; description: string } {
  const heatIndex = calculateHeatIndex(temp, humidity)
  const windChill = calculateWindChill(temp, windSpeed)
  
  let effectiveTemp = temp
  if (temp > 26) effectiveTemp = heatIndex
  if (temp < 10) effectiveTemp = windChill
  
  if (effectiveTemp < -10) return { level: 'Very Cold', color: 'text-blue-800', description: 'Dress warmly and limit exposure' }
  if (effectiveTemp < 0) return { level: 'Cold', color: 'text-blue-600', description: 'Wear warm clothing' }
  if (effectiveTemp < 10) return { level: 'Cool', color: 'text-blue-400', description: 'Light jacket recommended' }
  if (effectiveTemp < 20) return { level: 'Mild', color: 'text-green-600', description: 'Comfortable weather' }
  if (effectiveTemp < 26) return { level: 'Pleasant', color: 'text-green-500', description: 'Ideal conditions' }
  if (effectiveTemp < 30) return { level: 'Warm', color: 'text-yellow-600', description: 'Light clothing recommended' }
  if (effectiveTemp < 35) return { level: 'Hot', color: 'text-orange-600', description: 'Stay hydrated and seek shade' }
  return { level: 'Very Hot', color: 'text-red-600', description: 'Limit outdoor activities' }
}

// Cloud cover utilities
export function getCloudCoverDescription(cloudCover: number): string {
  if (cloudCover < 10) return 'Clear'
  if (cloudCover < 25) return 'Few clouds'
  if (cloudCover < 50) return 'Partly cloudy'
  if (cloudCover < 75) return 'Mostly cloudy'
  return 'Overcast'
}

// Types
export interface WeatherData {
  current: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    is_day: number
    precipitation: number
    rain: number
    showers: number
    snowfall: number
    weather_code: number
    cloud_cover: number
    pressure_msl: number
    surface_pressure: number
    wind_speed_10m: number
    wind_direction_10m: number
    wind_gusts_10m: number
    uv_index: number
    visibility: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    apparent_temperature: number[]
    precipitation_probability: number[]
    precipitation: number[]
    rain: number[]
    showers: number[]
    snowfall: number[]
    snow_depth: number[]
    weather_code: number[]
    pressure_msl: number[]
    surface_pressure: number[]
    cloud_cover: number[]
    visibility: number[]
    wind_speed_10m: number[]
    wind_direction_10m: number[]
    wind_gusts_10m: number[]
    uv_index: number[]
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    apparent_temperature_max: number[]
    apparent_temperature_min: number[]
    sunrise: string[]
    sunset: string[]
    daylight_duration: number[]
    sunshine_duration: number[]
    uv_index_max: number[]
    precipitation_sum: number[]
    rain_sum: number[]
    showers_sum: number[]
    snowfall_sum: number[]
    precipitation_hours: number[]
    precipitation_probability_max: number[]
    wind_speed_10m_max: number[]
    wind_gusts_10m_max: number[]
    wind_direction_10m_dominant: number[]
    shortwave_radiation_sum: number[]
    et0_fao_evapotranspiration: number[]
  }
}

export interface AirQualityData {
  current: {
    time: string
    us_aqi: number
    pm10: number
    pm2_5: number
    carbon_monoxide: number
    nitrogen_dioxide: number
    sulphur_dioxide: number
    ozone: number
    aerosol_optical_depth: number
    dust: number
    uv_index: number
    ammonia: number
  }
  hourly: {
    time: string[]
    pm10: number[]
    pm2_5: number[]
    carbon_monoxide: number[]
    nitrogen_dioxide: number[]
    sulphur_dioxide: number[]
    ozone: number[]
    aerosol_optical_depth: number[]
    dust: number[]
    uv_index: number[]
    ammonia: number[]
    us_aqi: number[]
  }
}

export interface HistoricalData {
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    temperature_2m_mean: number[]
    precipitation_sum: number[]
    rain_sum: number[]
    snowfall_sum: number[]
    wind_speed_10m_max: number[]
    wind_gusts_10m_max: number[]
    wind_direction_10m_dominant: number[]
  }
} 