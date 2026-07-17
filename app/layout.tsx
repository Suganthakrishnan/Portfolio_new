import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const heading = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Sugantha Krishnan — Embedded Systems · AI · Software Engineer',
  description:
    'Portfolio of Sugantha Krishnan — ECE engineer building intelligent hardware products that fuse Embedded Systems, PCB Design, Artificial Intelligence and Software Engineering.',
  keywords: ['Embedded Systems', 'AI', 'PCB Design', 'STM32', 'Machine Learning', 'ECE', 'Portfolio'],
  authors: [{ name: 'Sugantha Krishnan' }],
  openGraph: {
    title: 'Sugantha Krishnan — Embedded Systems × AI Engineer',
    description: 'Building intelligent products at the intersection of hardware and AI.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080c12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${heading.variable} ${mono.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
