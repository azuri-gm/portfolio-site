'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { FiTool } from 'react-icons/fi'
import { HiOutlineDesktopComputer } from 'react-icons/hi'

type NavbarItem = {
  href: string
  label: string
  icon?: JSX.Element
}

const links: NavbarItem[] = [
  { href: '/', label: 'Home', icon: <BiHomeAlt /> },
  { href: '/about', label: 'About', icon: <BsPerson /> },
  { href: '/blog', label: 'Blog', icon: <HiOutlineDesktopComputer /> },
  { href: '/uses', label: 'Uses', icon: <FiTool /> },
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
        <nav>
          <ul className='[&_li]:ml-4 ml-12 flex'>
            {links.map((link) => (
              <li key={link.href} className='flex items-center gap-1'>
                <span className='span'>{link.icon}</span>
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
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
