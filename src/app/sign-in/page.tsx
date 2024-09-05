"use client"

import SignInForm from '@/components/form/SignInForm';
import logo from '../../../public/images/starcansaylogo-31.png'
import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function SignInPage() {

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <SignInForm/>
    </div>
  )
}

export default SignInPage

