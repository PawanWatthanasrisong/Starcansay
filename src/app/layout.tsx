
import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./_app";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });
const kanit = Kanit({ 
  weight: '400',
  subsets: ['thai'],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <main>
            <Navbar/>
            <ClientWrapper>{children}</ClientWrapper>
          </main>
          <Toaster/>
          </body>
    </html>
  );
}
