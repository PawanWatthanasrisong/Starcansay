import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            console.log('here');
            if(!credentials?.email || !credentials?.password) {
                return null;
            }

            const existingUser = await prisma.user.findUnique({
                where: { email: credentials?.email }
            });
            if(!existingUser){
                throw new Error('CrednetialsSignin');
            }

            if(!existingUser.password){
                throw new Error('NoPasswordForCredentials')
            } 

            const passwordMatch = await compare(credentials.password, existingUser.password);
            if(!passwordMatch) {
                return null;
            }
            console.log('Correct Credentials');
            return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name
            }
          }
        }),
        GoogleProvider ({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            },
        })
      ],
      callbacks: {
        async jwt({ token, user}){
            if(user){
                return {
                    ...token,
                    email: user.email
                }
            }
            return token
        },
        async session({ session, user, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    email: token.email
                }
            }
        },
        async signIn({ account, profile, user }) {
            console.log(account,user)
            if (account?.provider === 'google') {
              const existingUser = await prisma.user.findUnique({
                where: {email: user.email}
              });
              if ((existingUser && (existingUser.password !== null))) {
                throw new Error('OAuthAccountNotLinked'); // Custom error for mismatched provider
              }
            }
            return true;
          },
      }
}