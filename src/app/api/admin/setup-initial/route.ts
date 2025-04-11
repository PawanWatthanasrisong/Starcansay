import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const initialAdminEmail = process.env.INITIAL_ADMIN_EMAIL;

if (!supabaseUrl || !supabaseServiceKey || !initialAdminEmail) {
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
    // This is a protected route that should only be called once during setup
    const { setupKey } = await req.json();

    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return NextResponse.json({ error: 'Invalid setup key' }, { status: 401 });
    }

    // Get the user by email
    const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers();
    
    if (getUserError) {
      throw getUserError;
    }

    const adminUser = users.find(user => user.email === initialAdminEmail);
    
    if (!adminUser) {
      return NextResponse.json({ error: 'Initial admin user not found' }, { status: 404 });
    }

    // Update user metadata to set admin role
    const { data, error } = await supabase.auth.admin.updateUserById(
      adminUser.id,
      { 
        user_metadata: { 
          role: 'admin'
        }
      }
    );

    if (error) {
      throw error;
    }

    return NextResponse.json({ 
      message: 'Initial admin setup complete',
      user: data.user 
    });

  } catch (error) {
    console.error('Error in initial admin setup:', error);
    return NextResponse.json({ error: 'Failed to setup initial admin' }, { status: 500 });
  }
} 