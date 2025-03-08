'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { Session } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import type { AuthChangeEvent } from '@supabase/supabase-js'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
    }

    fetchSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session)
        if (!session) {
          redirect('/')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return { session }
} 