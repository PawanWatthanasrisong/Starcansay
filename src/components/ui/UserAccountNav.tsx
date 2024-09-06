'use client'

import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react'

export default function UserAccountNav() {
  return (
        <Button className='bg-red-500 hover:bg-red-300' onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`,
        })}>
        Sign Out
        </Button>
  )
}
