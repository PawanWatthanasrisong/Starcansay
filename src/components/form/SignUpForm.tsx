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
import { useToast } from "@/components/hooks/use-toast"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
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
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
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
        name: values.name,
        email: values.email,
        password: values.password
      })
    })

    console.log(response);

    if(response.ok) {
      toast({
        title: "Sign-up Succesfully!",
        className: "bg-green-500 text-white",
      })
      router.push('/sign-in')
    } else {
      toast({
        title: "Cannot Sign up!",
        description: "You have registered with this Email, Try Sign-in or Sign-in with Google",
        variant: 'destructive'
      })
      console.log('Registration failed');
    }
  }

  return (
    <div className='bg-white border-[20px] rounded-lg border-white shadow-lg sm:max-w-sm'>
      <img src='images/starcansaylogo-31.png' width='400px'/>
      <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 -mt-5">
          Sign Up
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-5">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Name" type='name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
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
