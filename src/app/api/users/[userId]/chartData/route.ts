import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = await params;

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