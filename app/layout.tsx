import type { Metadata } from 'next'
import type React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { CommandMenu } from '@/components/command-menu'
import { Nav } from '@/components/nav'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Eduardo Gaytan',
  description: 'A look into my life and work',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-4rLeNeknOMbSBX3pmXovv9olVfe8k6.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          ibmPlexSans.variable,
          ibmPlexMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Nav />
          <CommandMenu />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
