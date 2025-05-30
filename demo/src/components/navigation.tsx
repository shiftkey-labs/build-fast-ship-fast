import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              My App
            </Link>
            <div className="flex space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  🏠 Home
                </Button>
              </Link>
              <Link href="/weather">
                <Button variant="ghost" size="sm">
                  🌤️ Weather
                </Button>
              </Link>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Halifax, Nova Scotia
          </div>
        </div>
      </div>
    </nav>
  )
} 