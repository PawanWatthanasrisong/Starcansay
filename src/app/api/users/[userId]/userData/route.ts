import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
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

        // Calculate age
        const age = response.birthdate ? new Date().getFullYear() - response.birthdate.getFullYear() : null;

        return NextResponse.json({ name, validBirthDate, validBirthTime, birthplace, age }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
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
    console.log(hour, minute);
    return `${hour}:${minute}`;
}
