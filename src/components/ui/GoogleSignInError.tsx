'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { toast } from '../hooks/use-toast';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function GoogleSignInError() {

  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get('error') === 'OAuthAccountNotLinked';

  useEffect(() => {
    if (error && status === 'unauthenticated') {
      toast({
        title: 'Login failed',
        description: 'This email is linked to another sign-in provider. Please use the correct provider.',
        variant: 'destructive'
      })
      redirect('/sign-in');
    }
  },[status])
  return null;
}