import '../globals.css'

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
      <body className={`${nunito.className}`}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <div className='text-custom-grey bg-darker-blue scrollbar-hide flex h-screen max-h-screen flex-col'>
            <Navbar />

            <div className='mx-auto w-3/4 flex-1 md:w-11/12'>
              <div className='scrollbar-hide container mx-auto h-full overflow-hidden'>
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
