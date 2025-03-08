import { PrismaClient } from '@prisma/client';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();

    await supabase.auth.exchangeCodeForSession(code);

    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user?.email) {
      // Check if user exists in our database using Prisma
      const existingUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      // If user doesn't exist, create a new user record
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: session.user.email,
            name: session.user.user_metadata.full_name || '',
          },
        });
      }

      // Check if user has graph data
      const userData = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { data: true },
      });

      // Redirect based on whether user has graph data
      if (!userData?.data) {
        return NextResponse.redirect(new URL('/contact-purchase', request.url));
      }
      return NextResponse.redirect(new URL('/graph', request.url));
    }
  }

  // Return to home page if something goes wrong
  return NextResponse.redirect(new URL('/', request.url));
} 