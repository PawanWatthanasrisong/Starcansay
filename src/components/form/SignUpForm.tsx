"use client";

import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/hooks/use-toast"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must have than 8 characters'),
  confirmPassword: z
  .string()
  .min(1, 'Password Confirmation is required'),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Password do not match',
});

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
  }
  })

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    })

    if(response.ok) {
      router.push('/sign-in')
    } else {
      console.error('Registration failed');
    }
  }

  return (
    <div>
      <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-5">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" type='password'{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Re-enter your password" type='password'{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className='text-xs'>Already have an account?
              <Link href='/sign-in' className='mx-2 text-pink-600 hover:text-pink-300 underline'>Sign In</Link>
            </p>
            <div className='flex justify-center'>
              <Button type="submit" className='w-full'>
                Sign Up
              </Button>
            </div>
        </form>
      
    </Form>

  </div>
    
  )
}
