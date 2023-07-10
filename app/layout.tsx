import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { Nunito } from 'next/font/google'

import { Navbar } from '@/components/Navbar'
import { type ReactNode } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'

const nunito = Nunito({ weight: '400', subsets: ['latin-ext', 'latin'] })

export const metadata = {
  title: 'Eduardo Gaytan | Software Engineer',
  description: 'My personal site and blog',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${nunito.className} mx-auto max-w-none`}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <div className='container flex h-screen max-h-screen flex-col'>
            <Navbar />
            <div className='mx-auto w-3/4 flex-1 md:w-11/12'>
              <div className='h-full overflow-hidden scrollbar-hide'>
                {children}
                <Analytics />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
