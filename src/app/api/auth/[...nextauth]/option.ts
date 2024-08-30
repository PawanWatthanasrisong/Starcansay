import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        // CredentialsProvider({
        //     name:"Credentials",
        //     credentials: {
        //         username: {
        //             label: "Username:",
        //             type: "text",
        //             placeholder: "your-cool-username"
        //         },
        //         password: {
        //             label: "Password:",
        //             type: "password",
        //         },
        //     },
        //     async authorize(credentials, req) {
        //         const res = await fetch("/your/endpoint", {
        //             method: 'POST',
        //             body: JSON.stringify(credentials),
        //             headers: { "Content-Type": "application/json" }
        //           })
        //           const user = await res.json()
            
        //           // If no error and we have user data, return it
        //           if (res.ok && user) {
        //             return user
        //           }
        //           // Return null if user data could not be retrieved
        //           return null
        //     }
        // })
    ],
    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async signIn({ account, profile}) {
            if(!profile?.email) {
                throw new Error('No profile')
            }

            await prisma.user.upsert({
                where: {
                    email: profile.email,
                },
                create: {
                    email: profile.email,
                    name: profile.name,
                },
                update: {
                    name: profile.name,
                },
            })
            return true;
        }
    }
}