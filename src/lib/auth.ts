import { createClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

// For client-side components
export async function checkAdmin() {
  try {
    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined';
    const baseUrl = isBrowser ? '' : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/auth/check-admin`, {
      method: 'GET',
    });
    const data = await response.json();
    return data.isAdmin;
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