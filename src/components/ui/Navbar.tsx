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
        <div className='flex items-center justify-between w-full max-w-full px-2'>
            <Link href='https://www.starcansay.com/' className='text-pink-400 font-medium text-xl flex items-center'>
              <img src="https://storage.cloud.google.com/starcansay/img/starcansaylogo-31%203.png" className='w-[38px] h-[29px] mr-2'/>
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
