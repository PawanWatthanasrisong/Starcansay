import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export async function checkAdmin() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return false;
    }

    // First check user metadata for admin role
    if (session.user.user_metadata?.role === 'admin') {
      return true;
    }

    return false;
    
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function checkAdminServer() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return false;
    }

    // First check user metadata for admin role
    if (session.user.user_metadata?.role === 'admin') {
      return true;
    }

    return false;
    
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function requireAdmin() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return null;
} 