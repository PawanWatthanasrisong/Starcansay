import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import { Prisma } from "@prisma/client";
import * as z from 'zod'

const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),

  })


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = userSchema.parse(body);

        //Check if email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: {email: email}
        });
        if(existingUserByEmail){
            return NextResponse.json({ user: null, message: "User with this email already exists"}, { status: 409})
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            } as Prisma.UserCreateInput     
        });

        const { password: newUserPassword, ...rest } = newUser;
        return NextResponse.json({ user: rest, message: "User created successfully"}, {status: 201});
    
    } catch(error){
        console.error(error);
        return NextResponse.json({ message: "Something went wrong!"}, {status: 500});
    }
}