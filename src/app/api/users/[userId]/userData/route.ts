import { NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';
import type { NextRequest } from "next/server";
import prisma from '@/lib/prisma';

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{ userId: string }> }
) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ isAdmin: false });
    }

    const caller = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!caller?.isAdmin) {
        return NextResponse.json({ message: 'Unauthorized'}, { status: 401});
    }

    const { userId } = await params;
    try {
        const response = await prisma.user.findUnique({
            where: { email: userId },
            select: { name: true, birthdate: true, birthplace: true },
        });

        if (!response) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const { name, birthplace, birthdate } = response;

        const validBirthDate = birthdate ? thaiBirthdate(birthdate) : null;
        const validBirthTime = birthdate ? thaiBirthTime(birthdate) : null;

        const age = birthdate ? calculateAge(birthdate) : null;

        return NextResponse.json({ name, validBirthDate, validBirthTime, birthplace, age }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


const thaiBirthdate = (birthDate: Date): string | null => {
    if (!birthDate) return null; // Return null if birthDate is not provided
    const birthdate = birthDate.toISOString().split('T')[0];
    const [year, month, date] = birthdate.split('-');
    const thaiYear = Number.parseInt(year) + 543; // Ensure year is treated as a number
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const thaiMonth = thaiMonths[Number.parseInt(month) - 1]; // Get the Thai month directly from the array
    return `${date} ${thaiMonth} พ.ศ.${thaiYear}`;
}

const thaiBirthTime = (birthDate: Date): string | null => {
    if (!birthDate) return null;
    const birthTime = birthDate.toISOString().split('T')[1];
    const [hour, minute] = birthTime.split(':');
    return `${hour}:${minute}`;
}
