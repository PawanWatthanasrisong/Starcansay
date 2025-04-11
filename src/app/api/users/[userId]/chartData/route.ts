import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from '@/lib/prisma';
import { createClient } from "@/utils/supabase/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user.user_metadata.role !== 'admin') {
          return NextResponse.json({ message: 'Unauthorized'}, { status: 401});
    }


    const { userId } = await params;

    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        const response = await prisma.user.findUnique({
            where: { email: userId },
            select: { data: true },
        });

        if (!response?.data) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        try {
            const parsedData = JSON.parse(response.data);
            return NextResponse.json(parsedData, { status: 200 });
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            return NextResponse.json({ message: 'Invalid data format' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}