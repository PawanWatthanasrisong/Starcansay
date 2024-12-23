import type { NextApiRequest, NextApiResponse } from "next";
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { string } from "zod";

const prisma = new PrismaClient()

export async function GET(req: Request) {
    try{
        const response = await prisma.user.findUnique({
        where: {email: process.env.ADMIN_EMAIL},
        select: {
            data: true,
          }
        });
        if (response?.data) {
            return NextResponse.json(JSON.parse(response.data), { status: 200 });
        } else {
            return NextResponse.json({ message: 'No product'});
        }
    } catch(error){
        console.error(error);
        return NextResponse.json({ message: "Something went wrong!"}, {status: 500});
    }
    
}