'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import UserAccountNav from './UserAccountNav'
import { createClient } from '@/utils/supabase/client'
import { Session } from '@supabase/supabase-js'

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // Cleanup subscription
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className='bg-white py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
        <div className='flex items-center justify-between w-full max-w-full px-2'>
            <Link href='https://www.starcansay.com/' className='text-pink-400 font-medium text-xl flex items-center'>
              <img src="https://storage.cloud.google.com/starcansay/img/starcansaylogo-31%203.png?authuser=1" className='w-[38px] h-[29px] mr-2'/>
              <p className='font-chulanarak text-[36px] font-normal mb-1'>
                Star Can Say.
              </p>
            </Link>
            {session?.user ? (
              <UserAccountNav/>
            ): ""}
        </div>
    </div>
  )
}