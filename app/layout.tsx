import '../globals.css'

import { Nunito } from 'next/font/google'
import { ReactElement } from 'react'

import { Navbar } from '@/components/Navbar'

const nunito = Nunito({ weight: '400', subsets: ['latin-ext', 'latin'] })

export const metadata = {
  title: 'Eduardo Gaytan | Software Engineer',
  description: 'My personal site and blog',
}

type Prop = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Prop): ReactElement {
  return (
    <html lang='en'>
      <body className={`${nunito.className} bg-darker-blue text-custom-grey`}>
        <div className='flex-col h-screen max-h-screen flex bg-darker-blue text-custom-grey'>
          <Navbar />
          <div className='flex-1'>
            <div className='container mx-auto h-full overflow-y-scroll'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
