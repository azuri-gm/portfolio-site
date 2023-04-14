import '../globals.css'

import { Analytics } from '@vercel/analytics/react'
import { Nunito } from 'next/font/google'
import { type ReactNode } from 'react'

import { Navbar } from '@/components/Navbar'

const nunito = Nunito({ weight: '400', subsets: ['latin-ext', 'latin'] })

export const metadata = {
  title: 'Eduardo Gaytan | Software Engineer',
  description: 'My personal site and blog',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): ReactNode {
  return (
    <html lang='en'>
      <body className={`${nunito.className} bg-darker-blue text-custom-grey`}>
        <div className='flex-col h-screen max-h-screen flex bg-darker-blue text-custom-grey scrollbar-hide'>
          <Navbar />
          <div className='flex-1 w-3/4 md:w-11/12 mx-auto'>
            <div className='container mx-auto h-full overflow-hidden scrollbar-hide'>
              {children}
              <Analytics />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
