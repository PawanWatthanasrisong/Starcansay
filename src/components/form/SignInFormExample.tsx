"use client";

import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function SignInForm() {
  return (
      <div className='relative flex min-h-screen justify-center items-center bg-pink-100'>
        <div className='flex flex-col items-center'>
          <div className='mb-6 -mt-20'>
            <img src='/images/starcansaylogo-31.png' width={400} alt={"logo"} />
          </div>

          <div className=" bg-white max-w-fit  rounded-lg shadow-lg p-8 w-full">
            <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>

            {/* SignIn Form */}
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form action="#" method="POST" className="space-y-6" >

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-gray-900 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              {/* SignIn Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            </div>

            {/* Divider */}
            <div className="relative flex py-5 items-center w-full sm:max-w-sm">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-3 text-gray-900">Or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
          </div>
      </div>
    </div>
  )
}
