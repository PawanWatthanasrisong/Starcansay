import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

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
                console.log('No Email Password');
                return null;
            }

            const existingUser = await prisma.user.findUnique({
                where: { email: credentials?.email }
            });
            if(!existingUser){
                console.log('No Email');
                return null;
            }

            const passwordMatch = await compare(credentials.password, existingUser.password);
            if(!passwordMatch) {
                console.log('Wrong Password');
                return null;
            }

            console.log('Correct Credentials');
            return {
                id: existingUser.id,
                email: existingUser.email
            }
          }
        })
      ],
      callbacks: {
        async jwt({ token, user}){
            console.log('jwt callback', { token , user});
            if(user){
                return {
                    ...token,
                    email: user.email
                }
            }
            return token
        },
        async session({ session, user, token}) {
            console.log('session callback', { session , user, token});
            return {
                ...session,
                user: {
                    ...session.user,
                    email: token.email
                }
            }
            return session
        }        
      }
}