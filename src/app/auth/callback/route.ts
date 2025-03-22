import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.email) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const userEmail = session.user.email;
    const userName = typeof session.user.user_metadata?.full_name === 'string' 
      ? session.user.user_metadata.full_name 
      : '';

    // First check if user exists
    let user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true, data: true }
    });

    // If user doesn't exist, create them
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: userName,
        },
        select: { id: true, data: true }
      });
    }

    // Redirect based on whether user has graph data
    if (!user.data) {
      return NextResponse.redirect(new URL('/contact-purchase', request.url));
    }
    return NextResponse.redirect(new URL('/graph', request.url));

  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
} 