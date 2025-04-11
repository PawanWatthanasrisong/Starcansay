import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/auth';
import { commonColors } from '@nextui-org/theme';

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
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user.user_metadata.role !== 'admin') {
          return NextResponse.json({ message: 'Unauthorized'}, { status: 401});
    }

    const { targetUserEmail, action } = await req.json();

    if (!targetUserEmail || !action || !['grant', 'revoke'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
    }

    // Get the target user
    const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers();
    if (getUserError) {
      throw getUserError;
    }

    const targetUser = users.find(user => user.email === targetUserEmail);
    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    // Update user metadata
    const { data, error } = await supabase.auth.admin.updateUserById(
      targetUser.id,
      { 
        user_metadata: { 
          role: action === 'grant' ? 'admin' : null
        }
      }
    );

    if (error) {
      throw error;
    }

    return NextResponse.json({ 
      message: `Admin role ${action}ed for user ${targetUserEmail}`,
      user: data.user 
    });

  } catch (error) {
    console.error('Error managing admin role:', error);
    return NextResponse.json({ error: 'Failed to manage admin role' }, { status: 500 });
  }
} 