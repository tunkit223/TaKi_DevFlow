import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/Theme";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
