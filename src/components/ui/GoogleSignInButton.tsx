'use client'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Button } from './button'
import { signIn } from 'next-auth/react';
import { cn } from '@/lib/utils';

interface GoogleSignInButtonProps {
  children: ReactNode;
  className?: string;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
  children,
  className
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async() => {
    try{
      setIsLoading(true);
      await signIn('google', {
        callbackUrl: 'http://localhost:3000/graph',
      });
    } catch(error){
      console.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
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

export default GoogleSignInButton;
