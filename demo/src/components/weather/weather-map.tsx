'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface WeatherMapProps {
  coords: {
    latitude: number
    longitude: number
    timezone: string
  }
}

export default function WeatherMap({ coords }: WeatherMapProps) {
  const [mapType, setMapType] = useState<'precipitation' | 'clouds' | 'pressure' | 'wind' | 'temp'>('precipitation')
  
  // Map layer configurations for different weather data
  const mapLayers = {
    precipitation: {
      name: 'Precipitation',
      icon: '🌧️',
      description: 'Rain and snow intensity',
      url: `https://tile.openweathermap.org/map/precipitation_new`
    },
    clouds: {
      name: 'Cloud Cover',
      icon: '☁️',
      description: 'Cloud coverage percentage',
      url: `https://tile.openweathermap.org/map/clouds_new`
    },
    pressure: {
      name: 'Pressure',
      icon: '📊',
      description: 'Atmospheric pressure systems',
      url: `https://tile.openweathermap.org/map/pressure_new`
    },
    wind: {
      name: 'Wind Speed',
      icon: '💨',
      description: 'Wind speed and direction',
      url: `https://tile.openweathermap.org/map/wind_new`
    },
    temp: {
      name: 'Temperature',
      icon: '🌡️',
      description: 'Temperature distribution',
      url: `https://tile.openweathermap.org/map/temp_new`
    }
  }

  // Calculate map center and zoom for Halifax
  const mapCenter = {
    lat: coords.latitude,
    lng: coords.longitude,
    zoom: 8
  }

  // Generate Windy.com embed URL for Halifax
  const windyUrl = `https://embed.windy.com/embed2.html?lat=${coords.latitude}&lon=${coords.longitude}&detailLat=${coords.latitude}&detailLon=${coords.longitude}&width=100%&height=400&zoom=8&level=surface&overlay=${mapType === 'precipitation' ? 'rain' : mapType === 'clouds' ? 'clouds' : mapType === 'pressure' ? 'pressure' : mapType === 'wind' ? 'wind' : 'temp'}&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`

  // Alternative: OpenWeatherMap-style visualization (simplified)
  const weatherMapFeatures = [
    {
      type: 'Current Location',
      icon: '📍',
      description: 'Halifax, Nova Scotia',
      coordinates: `${coords.latitude.toFixed(4)}°N, ${Math.abs(coords.longitude).toFixed(4)}°W`
    },
    {
      type: 'Weather System',
      icon: mapLayers[mapType].icon,
      description: mapLayers[mapType].description,
      info: 'Real-time data overlay'
    },
    {
      type: 'Maritime Influence',
      icon: '🌊',
      description: 'Atlantic Ocean effects',
      info: 'Coastal weather patterns'
    },
    {
      type: 'Regional Coverage',
      icon: '🗺️',
      description: 'Nova Scotia region',
      info: '100km radius view'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span>🗺️</span>
            Weather Map
          </CardTitle>
          <div className="text-sm text-gray-600">
            Halifax, NS
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Map Layer Selector */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(mapLayers).map(([key, layer]) => (
            <Button
              key={key}
              variant={mapType === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapType(key as any)}
              className="text-xs"
            >
              <span className="mr-1">{layer.icon}</span>
              {layer.name}
            </Button>
          ))}
        </div>

        {/* Map Container */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-80 flex items-center justify-center overflow-hidden">
            {/* Embedded Windy Map */}
            <iframe
              src={windyUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-lg"
              title="Halifax Weather Map"
            />
          </div>
          
          {/* Map Overlay Info */}
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
            <div className="font-medium">{mapLayers[mapType].name}</div>
            <div className="text-gray-600">{mapLayers[mapType].description}</div>
          </div>
        </div>

        {/* Map Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {weatherMapFeatures.map((feature, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-lg">{feature.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{feature.type}</div>
                  <div className="text-xs text-gray-600">{feature.description}</div>
                  {feature.coordinates && (
                    <div className="text-xs text-blue-600 mt-1">{feature.coordinates}</div>
                  )}
                  {feature.info && (
                    <div className="text-xs text-green-600 mt-1">{feature.info}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="font-medium text-sm text-blue-900 mb-2">Map Information</div>
          <div className="text-xs text-blue-800 space-y-1">
            <p>• Real-time weather data from European Centre for Medium-Range Weather Forecasts (ECMWF)</p>
            <p>• Updated every 6 hours with high-resolution models</p>
            <p>• Interactive controls: zoom, pan, and layer selection</p>
            <p>• Maritime weather patterns specific to Atlantic Canada</p>
          </div>
        </div>

        {/* Alternative Static Map Info */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="font-medium text-sm mb-2">Regional Context</div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-gray-600">Coordinates</div>
              <div className="font-medium">{coords.latitude.toFixed(4)}°N, {Math.abs(coords.longitude).toFixed(4)}°W</div>
            </div>
            <div>
              <div className="text-gray-600">Time Zone</div>
              <div className="font-medium">{coords.timezone}</div>
            </div>
            <div>
              <div className="text-gray-600">Region</div>
              <div className="font-medium">Atlantic Canada</div>
            </div>
            <div>
              <div className="text-gray-600">Climate Zone</div>
              <div className="font-medium">Humid Continental</div>
            </div>
          </div>
        </div>

        {/* Map Controls Info */}
        <div className="text-xs text-gray-500 text-center">
          Click and drag to pan • Scroll to zoom • Select different weather layers above
        </div>
      </CardContent>
    </Card>
  )
} 