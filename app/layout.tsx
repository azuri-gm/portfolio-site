import type React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { cn } from '@/lib/utils';
import { Nav } from '@/components/nav';
import { ThemeProvider } from '@/components/theme-provider';
import { CommandMenu } from '@/components/command-menu';

export const metadata: Metadata = {
  title: 'Eduardo Gaytan',
  description: 'A look into my life and work',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-4rLeNeknOMbSBX3pmXovv9olVfe8k6.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased relative',
          GeistSans.variable
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <Nav />
          <CommandMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import './globals.css';
