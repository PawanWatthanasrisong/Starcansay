'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import UserAccountNav from './UserAccountNav'
import { createClient } from '@/utils/supabase/client'
import type { Session } from '@supabase/supabase-js'

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, [supabase.auth]); // Added supabase.auth to the dependency array

  return (
    <div className='bg-white py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
        <div className='flex items-center justify-between w-full max-w-full px-2'>
            <Link href='https://www.starcansay.com/' className='text-pink-400 font-medium text-xl flex items-center'>
              <Image src="/images/starcansaylogo-31-3.png" width={38} height={29} className='mr-2' alt='starcansay logo'/>
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