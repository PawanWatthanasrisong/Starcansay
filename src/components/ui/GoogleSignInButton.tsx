'use client'
import {useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'

interface GoogleSignInButtonProps {
  children: ReactNode
  className?: string
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
  children,
  className
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const loginWithGoogle = async() => {
    try {
      setIsLoading(true)
      const supabase = createClient()

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      disabled={isLoading} 
      onClick={loginWithGoogle} 
      className={cn(
        'w-80 h-16 bg-starcansaypink text-2xl font-bold rounded-2xl hover:bg-starcansaypink-light',
        className
      )}
    >
      {children}
    </Button>
  )
}

export default GoogleSignInButton
