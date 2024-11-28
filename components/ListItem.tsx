import { motion } from 'framer-motion'
import Link from 'next/link'
import { type FC } from 'react'
import { type ListItemProps } from 'types/Navbar'

export const ListItem: FC<ListItemProps> = ({ slug, link, isActive }) => {
  return (
    <li key={slug} className='flex items-center gap-1'>
      <Link
        className='relative transition-opacity hover:opacity-80'
        href={link.href}
      >
        {isActive && (
          <motion.span
            layoutId='underline'
            className='absolute left-0 top-full block h-[2px] w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
          />
        )}
        {link.label}
      </Link>
    </li>
  )
}
