import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Movies Database',
  description: 'A simple movie database built with Next.js and Supabase',
}

export default function MoviesLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Movies Database</h1>
      {children}
    </div>
  )
}
