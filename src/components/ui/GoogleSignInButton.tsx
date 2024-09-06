'use client'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Button } from './button'
import { signIn, useSession } from 'next-auth/react';
import { useToast } from '../hooks/use-toast';
import { useRouter } from 'next/navigation';


interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({children}) => {
  const router = useRouter();
  const {data: session, status} = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGogogle = async() => {
    try{
      setIsLoading(true);
      console.log(`sign in with google`)
      const signInData = await signIn('google', {
        callbackUrl: 'http://localhost:3000/dashboard?login=success',
      });
      console.log(signInData);
    } catch(error){
      console.log(`Error: ${error}`);
      setIsLoading(false);
    } finally {
      console.log('here');
      setIsLoading(false);
    }
  }


  return (
    <Button disabled={isLoading} onClick={loginWithGogogle} className='w-full'>
      {children}
    </Button>
  )
}

export default GoogleSignInButton;
