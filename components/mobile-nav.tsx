'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const navItems = [
  { href: '/', label: 'Overview' },
  { href: '/about', label: 'About' },
  { href: '/uses', label: 'Uses' },
  { href: '/blog', label: 'Blog' },
]

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden relative z-50"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] z-50">
        <div className="flex items-center gap-2 border-b pb-4">
          <Avatar>
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-4rLeNeknOMbSBX3pmXovv9olVfe8k6.png"
              alt="Avatar"
            />
            <AvatarFallback>EG</AvatarFallback>
          </Avatar>
          <span className="font-medium">Eduardo Gaytan</span>
        </div>
        <nav className="flex flex-col gap-1 mt-4">
          {navItems.map(item => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground/80',
                )}
              >
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                )}
                {item.label}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
