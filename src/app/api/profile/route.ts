import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const email = session.user.email;

        // Get user data
        const response = await prisma.user.findUnique({
            where: { email },
            select: { 
                name: true, 
                birthdate: true, 
                birthplace: true,
                data: true 
            },
        });

        if (!response) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const { name, birthplace, birthdate, data } = response;

        const validBirthDate = birthdate ? thaiBirthdate(birthdate) : null;
        const validBirthTime = birthdate ? thaiBirthTime(birthdate) : null;

        // Calculate age considering months and days
        const age = birthdate ? calculateAge(birthdate) : null;

        // Parse chart data if it exists
        let chartData = null;
        if (data) {
            try {
                chartData = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
            }
        }

        return NextResponse.json({ 
            userData: { name, validBirthDate, validBirthTime, birthplace, age },
            chartData
        }, { status: 200 });
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