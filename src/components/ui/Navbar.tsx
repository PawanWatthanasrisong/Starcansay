import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './button'
import { options } from '@/app/api/auth/[...nextauth]/option'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import UserAccountNav from './UserAccountNav'

export default async function Navbar() {

  const session = await getServerSession(options);

  return (
    <div className='bg-white py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
        <div className='flex items-center justify-between mx-auto max-w-screen-lg'>
            <Link href='https://www.starcansay.com/' className='text-pink-400 font-medium text-xl'>
              Star Can Say.
            </Link>
            {session?.user ? (
              <UserAccountNav/>
            ): (
              <Link href='/sign-in'>
              <Button className='bg-blue-900 hover:bg-blue-300'>
                Sign In
              </Button>
            </Link>
            )}
        </div>
    </div>
  )
}
