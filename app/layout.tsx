import React from "react"
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import PatternBackground from '@/components/portfolio/pattern-background'

// تفعيل خط IBM Plex Sans Arabic بأوزان كاملة مع عرض swap وتعيين متغير CSS للاستخدام العام
const _ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'مهندس برمجيات | Full-Stack Developer',
  description: 'مطور برمجيات متخصص في تطوير الواجهات الأمامية والخلفية وبناء وكلاء ذكاء اصطناعي',

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${_ibmPlexArabic.variable} font-sans antialiased`}>
        <PatternBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
