import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "RUMERA — A New Era of Truth",
  description: "AI-powered platform for truth, trust, and safety.",
  icons: {
    icon: "/RUMERA -AI LOGO.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Analytics />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
