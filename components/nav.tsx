'use client'

import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CommandMenu } from './command-menu'
import { MobileNav } from './mobile-nav'
import { ThemeToggle } from './theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

const navItems = [
  { href: '/', label: 'Overview' },
  { href: '/about', label: 'About' },
  { href: '/uses', label: 'Uses' },
  { href: '/blog', label: 'Blog' },
]

export function Nav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <MobileNav />
          </div>

          <div className="md:flex items-center hidden">
            <Button variant="ghost" className="pl-0">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-4rLeNeknOMbSBX3pmXovv9olVfe8k6.png"
                  alt="Avatar"
                />
                <AvatarFallback>EG</AvatarFallback>
              </Avatar>
              <span className="font-medium">Eduardo Gaytan</span>
            </Button>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1">
            <nav className="flex items-center space-x-1">
              {navItems.map(item => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                      active
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground/80',
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-[-1.2rem] left-1/2 -translate-x-1/2 h-[2px] w-4/5 bg-foreground rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center justify-end space-x-4 ml-auto md:ml-0">
            <CommandMenu>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open command menu"
              >
                <Search className="h-5 w-5" />
              </Button>
            </CommandMenu>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
