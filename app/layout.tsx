import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/Theme";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


const inter = Inter({
  subsets: ["latin"],
  weight:['100','200','300','400','500','600','700','800',"900"],
  display:"swap",
  variable:"--font-inter"
});



export const metadata: Metadata = {
  title: "DevFlow",
  description: "Stack OverFlow fake",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link 
        rel="stylesheet" 
        type='text/css' 
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <SessionProvider session={session}>
      <body
        className={`${inter.variable} antialiased`} 
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class" 
          defaultTheme="system"
          enableSystem 
          disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
        <Toaster/>
      </body>
      </SessionProvider>
    </html>
  );
}
