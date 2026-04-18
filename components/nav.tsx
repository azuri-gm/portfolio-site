'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MobileNav } from './mobile-nav'
import { ThemeToggle } from './theme-toggle'

const navItems = [
  { href: '/', label: 'Overview' },
  { href: '/about', label: 'About' },
  { href: '/uses', label: 'Uses' },
  { href: '/blog', label: 'Blog' },
]

function openCommandPalette() {
  const ev = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
  document.dispatchEvent(ev)
}

export function Nav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/')
      return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        background: 'hsl(var(--background) / 0.7)',
        borderBottom: '1px solid hsl(var(--border))',
      }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
        <div className="flex h-16 items-center gap-5">
          {/* Mobile menu */}
          <div className="md:hidden">
            <MobileNav />
          </div>

          {/* Logo */}
          <Link href="/" className="hidden md:flex items-center gap-2.5">
            <span
              className="font-mono"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: 'hsl(24 95% 53% / 0.1)',
                border: '1px solid hsl(24 95% 53% / 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: 'hsl(24 95% 53%)',
                fontWeight: 600,
              }}
            >
              eg
            </span>
            <span className="font-mono text-foreground" style={{ fontSize: 13, fontWeight: 500 }}>
              Eduardo Gaytan
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative font-mono transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground hover:text-foreground/85',
                  )}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 6,
                    fontSize: 12,
                    letterSpacing: '0.02em',
                  }}
                >
                  <span className="opacity-40 mr-1.5">/</span>
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        bottom: -1,
                        left: 12,
                        right: 12,
                        height: 1,
                        background: 'hsl(24 95% 53%)',
                        boxShadow: '0 0 8px hsl(24 95% 53% / 0.6)',
                      }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              className="hidden sm:inline-flex items-center gap-2 font-mono text-muted-foreground hover:text-foreground transition-colors"
              style={{
                padding: '7px 10px 7px 12px',
                borderRadius: 7,
                border: '1px solid hsl(var(--border))',
                background: 'hsl(var(--card) / 0.4)',
                fontSize: 12,
              }}
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <span className="flex gap-0.5 ml-2">
                <span className="v2-kbd">⌘</span>
                <span className="v2-kbd">K</span>
              </span>
            </button>
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              className="sm:hidden inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
              style={{ width: 36, height: 36, borderRadius: 6 }}
            >
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
