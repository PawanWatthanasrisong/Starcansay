'use client'

import React from 'react'
import { Button } from './button'
import { createClient } from '@/utils/supabase/client'

export default function UserAccountNav() {
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut()
  }
  return (
        <Button className='bg-white hover:bg-red-300 text-starcansaypink  border-starcansaypink border-2 h-[32px]' onClick={() => signOut()}>
        Sign Out
        </Button>
  )
}
