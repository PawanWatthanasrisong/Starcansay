"use client"; // Mark this as a Client Component

import { SessionProvider } from "next-auth/react";
import { Kanit, IBM_Plex_Sans_Thai_Looped } from 'next/font/google'

const kanit = Kanit({ 
  weight: '400',
  subsets: ['thai'],
})

const ibm = IBM_Plex_Sans_Thai_Looped({ 
  weight: '400',
  subsets: ['thai'],
})


export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SessionProvider>{children}</SessionProvider>
  
);
}