'use client'

import { ModeToggle } from '@/components/ModeToggle'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC } from 'react'

type NavbarItem = {
  href: string
  label: string
}

const links: NavbarItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/uses', label: 'Uses' },
]

function isActive(link: NavbarItem, path: string) {
  return link.label.toLowerCase() === path
}

export const Navbar: FC = () => {
  const path = usePathname().split('/')[1] || 'home'

  return (
    <header className='relative z-10 w-full p-4'>
      <div className='flex items-center justify-between py-8'>
        <Link href='/' className='text-xl font-bold'>
          Eduardo Gaytan
        </Link>
        <nav className='flex gap-x-2'>
          <ul className='ml-12 flex [&_li]:ml-4'>
            {links.map((link) => ListItem(link, path))}
          </ul>
          <ul>
            <ModeToggle />
          </ul>
        </nav>
      </div>
    </header>
  )
}

function ListItem(link: NavbarItem, path: string): JSX.Element {
  return (
    <li key={link.href} className='flex items-center gap-1'>
      <Link className='relative' href={link.href}>
        {isActive(link, path) && (
          <div>
            <motion.span
              layoutId='underline'
              className='absolute left-0 top-full block h-[2px] w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
            />
          </div>
        )}
        {link.label}
      </Link>
    </li>
  )
}
