import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🌤️</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Halifax Weather Dashboard
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Get comprehensive, real-time weather information for Halifax, Nova Scotia. 
          Powered by Open-meteo API with detailed forecasts, air quality data, and interactive maps.
        </p>
        <Link href="/weather">
          <Button size="lg" className="text-lg px-8 py-3">
            🚀 View Weather Dashboard
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🌡️</span>
              Current Conditions
            </CardTitle>
            <CardDescription>
              Real-time weather data updated every 5 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Temperature and feels-like temperature</li>
              <li>• Humidity, pressure, and visibility</li>
              <li>• Wind speed, direction, and gusts</li>
              <li>• UV index and cloud cover</li>
              <li>• Precipitation and weather conditions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Forecasts & Analysis
            </CardTitle>
            <CardDescription>
              Detailed hourly and daily forecasts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 24-hour hourly forecasts</li>
              <li>• 14-day daily outlook</li>
              <li>• Historical weather data</li>
              <li>• Weather pattern analysis</li>
              <li>• Temperature trends</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🌬️</span>
              Air Quality & Alerts
            </CardTitle>
            <CardDescription>
              Environmental monitoring and safety
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Real-time air quality index</li>
              <li>• Pollutant level monitoring</li>
              <li>• Weather alerts and warnings</li>
              <li>• Health recommendations</li>
              <li>• Safety guidelines</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🗺️</span>
              Interactive Maps
            </CardTitle>
            <CardDescription>
              Visual weather data representation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Live precipitation radar</li>
              <li>• Cloud cover visualization</li>
              <li>• Pressure system maps</li>
              <li>• Wind pattern overlays</li>
              <li>• Temperature distribution</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🌅</span>
              Astronomy Info
            </CardTitle>
            <CardDescription>
              Sun and daylight information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Sunrise and sunset times</li>
              <li>• Daylight duration</li>
              <li>• Sunshine hours</li>
              <li>• Solar position tracking</li>
              <li>• Twilight calculations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Advanced Features
            </CardTitle>
            <CardDescription>
              Comprehensive weather insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Heat index calculations</li>
              <li>• Wind chill analysis</li>
              <li>• Comfort level assessment</li>
              <li>• Maritime weather advisories</li>
              <li>• Emergency contact information</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Location Info */}
      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <span className="text-2xl">📍</span>
              Halifax, Nova Scotia
            </CardTitle>
            <CardDescription>
              Your weather dashboard is specifically configured for Halifax's unique maritime climate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-gray-600">Coordinates</div>
                <div className="font-medium">44.6476°N, 63.5728°W</div>
              </div>
              <div>
                <div className="text-gray-600">Time Zone</div>
                <div className="font-medium">America/Halifax</div>
              </div>
              <div>
                <div className="text-gray-600">Climate</div>
                <div className="font-medium">Humid Continental</div>
              </div>
              <div>
                <div className="text-gray-600">Data Source</div>
                <div className="font-medium">Open-meteo API</div>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/weather">
                <Button className="w-full">
                  🌤️ Launch Weather Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Weather data provided by{' '}
          <a 
            href="https://open-meteo.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open-meteo.com
          </a>
          {' '}• Built with Next.js 15 and Server Components
        </p>
      </footer>
    </div>
  )
}
