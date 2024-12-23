'use client'

import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react'

export default function UserAccountNav() {
  return (
        <Button className='bg-white hover:bg-red-300 text-starcansaypink  border-starcansaypink border-2 h-[32px]' onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/`,
        })}>
        Sign Out
        </Button>
  )
}
