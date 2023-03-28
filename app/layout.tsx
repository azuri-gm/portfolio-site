import '../globals.css'

import { Nunito } from 'next/font/google'
import { ReactElement, ReactNode } from 'react'
export { reportWebVitals } from 'next-axiom'

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
}): ReactElement {
  return (
    <html lang='en'>
      <body className={`${nunito.className} bg-darker-blue text-custom-grey`}>
        <div className='flex-col h-screen max-h-screen flex bg-darker-blue text-custom-grey'>
          <Navbar />
          <div className='flex-1 w-9/12 mx-auto'>
            <div className='container mx-auto h-full overflow-hidden scrollbar-hide'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
