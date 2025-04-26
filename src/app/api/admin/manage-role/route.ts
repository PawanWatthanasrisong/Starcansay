import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables');
}

const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(req: Request) {
  try {
    // Verify the requester is an admin
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ message: 'Unauthorized'}, { status: 401});
    }

    const { targetUserEmail, action } = await req.json();

    if (!targetUserEmail || !action || !['grant', 'revoke'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
    }

    // Update user's isAdmin status in the database
    const updatedUser = await prisma.user.update({
      where: { email: targetUserEmail },
      data: { isAdmin: action === 'grant' },
      select: { email: true, isAdmin: true }
    });

    if (!updatedUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: `Admin role ${action}ed for user ${targetUserEmail}`,
      user: updatedUser 
    });

  } catch (error) {
    console.error('Error managing admin role:', error);
    return NextResponse.json({ error: 'Failed to manage admin role' }, { status: 500 });
  }
} 