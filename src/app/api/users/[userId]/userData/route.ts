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
        const { name, birthplace } = response;
        const birthdate = response.birthdate ? response.birthdate.toISOString().split('T')[0] : null;
        const birthTime = response.birthdate ? response.birthdate.toISOString().split('T')[1] : null;

        return NextResponse.json({ name, birthdate, birthTime, birthplace }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}