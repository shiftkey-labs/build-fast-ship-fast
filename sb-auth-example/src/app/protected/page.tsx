import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { Navbar } from '@/components/navbar'
import { createClient } from '@/lib/supabase/server'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center gap-2">
        <p>
          Hello <span>{data.user.email}</span>
        </p>
        <LogoutButton />
      </div>
    </div>
  )
}
