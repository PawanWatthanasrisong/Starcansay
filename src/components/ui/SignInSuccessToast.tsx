"use client"
import { toast } from '@/components/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';


export default function SignInSuccessToast() {
  
    const searchParams = useSearchParams();
    const loginSuccess = searchParams.get('login') === 'success';
    const router = useRouter();
  
    useEffect(() => {
      if (loginSuccess) {
        toast({
          title: 'Verified',
          description: 'Sign-in Successfully',
          className: 'bg-green-500 text-white',
        });
  
        // Remove the query parameter from the URL
        router.replace('/dashboard', undefined);
      }
    }, [loginSuccess, router]);
  
    return null;
  }