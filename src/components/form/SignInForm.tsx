"use client";

import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
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
import Link from 'next/link';
import GoogleSignInButton from '../ui/GoogleSignInButton';
import { useToast } from '@/components/hooks/use-toast';
import GoogleSignInError from '../ui/GoogleSignInError';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must have than 8 characters'),
})

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
  }
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials',{
      email: values.email,
      password: values.password,
      redirect: false,
    });
    
    switch(signInData?.error){
      case 'CredentialsSignin':
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again",
          variant: 'destructive'
        })
        break;
      case 'NoPasswordForCredentials':
        toast({
          title: 'Login failed',
          description: 'This email is linked to another sign-in provider. Please use the correct provider.',
          variant: 'destructive'
        })
        break;
      case 'OAuthAccountNotLinked':
        toast({
          title: 'Login failed',
          description: 'This email is linked to another sign-in provider. Please use the correct provider.',
          variant: 'destructive'
        })
        break;
      case null:
        toast({
          title: "Verified",
          description: "Login Succesfully",
          className: "bg-green-500 text-white",
        })
        router.push('/dashboard');
        router.refresh();
        break;
      default :
        toast({
          title: "Error",
          description: "Oops! Something went wrong!",
          variant: 'destructive'
        })
        break;
    }
  }

  return (
    <div className='bg-white border-[20px] rounded-lg border-white shadow-lg sm:max-w-sm'>
      <div className='flex justify-center'>
        <img src='images/starcansaylogo-31.png' width='400px'/>
      </div>
      <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 -mt-5">
          Sign in to your account
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
                <FormMessage/>
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
            <p className='text-xs'>Don't have an account?
              <Link href='/sign-up' className='mx-2 text-pink-600 hover:text-pink-300 underline'>Sign up</Link>
            </p>
            <div>
              <Button type="submit" className='w-full'>
                  <span>
                    Sign in
                  </span>
              </Button>
            </div>
        </form>
      
    </Form>
    {/* Divider */}
    <div className="flex py-5 items-center w-full sm:max-w-sm">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-1 text-gray-900">Or</span>
                <div className="flex-grow border-t border-gray-400"></div>
    </div>
    <GoogleSignInButton>
      <img src='/images/Google_Icons-09-512.webp' alt='google-logo' width='25px'/>
      Sign in with google
    </GoogleSignInButton>
    <GoogleSignInError/>
  </div>
  )
}

