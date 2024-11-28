'use client'

import { ListItem } from '@/components/ListItem'
import { ModeToggle } from '@/components/ModeToggle'
import { usePathname } from 'next/navigation'
import { type FC } from 'react'
import { type NavbarItem } from 'types/Navbar'

const links: NavbarItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/uses', label: 'Uses' },
]

function isActive(link: NavbarItem, path: string) {
  if (link.href === '/') {
    return path === 'home' || path === ''
  }
  return link.href.slice(1) === path
}

export const Navbar: FC = () => {
  const path = usePathname().split('/')[1] || 'home'

  return (
    <header className='relative z-10 flex w-full items-center justify-center p-4'>
      <nav className='flex items-center gap-x-4'>
        <ul className='flex gap-x-4'>
          {links.map((link) => (
            <ListItem
              key={link.href}
              slug={link.href}
              link={link}
              isActive={isActive(link, path)}
            />
          ))}
        </ul>
        <ModeToggle />
      </nav>
    </header>
  )
}
