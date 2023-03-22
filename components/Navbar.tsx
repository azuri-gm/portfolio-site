'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
]

export const Navbar: FC = () => {
  const path = usePathname().split('/')[1] || 'home'

  return (
    <header className='relative z-10 w-full p-4'>
      <div className='flex items-center justify-between py-8'>
        <Link href='/' className='text-xl font-bold'>
          Eduardo Gaytan
        </Link>
        <nav>
          <ul className='[&_li]:ml-4 ml-12 flex'>
            {links.map((link) => (
              <li key={link.href}>
                <Link className='relative' href={link.href}>
                  {link.label.toLowerCase() === path && (
                    <motion.span
                      layoutId='underline'
                      className='absolute left-0 top-full block h-[2px] w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
