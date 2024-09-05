import { getServerSession, Session } from 'next-auth';
import React from 'react'
import { options } from '../api/auth/[...nextauth]/option';

export default async function page() {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <div>
        <div className='mt-10'>
          Hi
        </div>
        <div>
          Hi
        </div>
    </div>
  )
}
