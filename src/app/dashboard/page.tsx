import { getServerSession } from 'next-auth';
import React from 'react';
import { options } from '../api/auth/[...nextauth]/option';
import { redirect} from 'next/navigation';
import SignInSuccessToast from '@/components/ui/SignInSuccessToast';
import LineGraph from '@/components/graph/LineGraph';

export default async function Page() {
  const session = await getServerSession(options);

  if (!session){
    redirect('/sign-in');
  }

    return (
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <div className='mt-10'>
          Hi {session?.user?.name}!!
        </div>
        <SignInSuccessToast />
      </div>
    )
  }

