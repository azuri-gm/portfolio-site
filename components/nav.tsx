'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ThemeToggle } from './theme-toggle';
import { CommandMenu } from './command-menu';
import { MobileNav } from './mobile-nav';

const navItems = [
  { href: '/', label: 'Overview' },
  { href: '/about', label: 'About' },
  { href: '/uses', label: 'Uses' },
  { href: '/blog', label: 'Blog' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm'>
      <div className='container mx-auto'>
        <div className='flex h-16 items-center px-4'>
          <div className='flex items-center justify-between w-full md:w-auto'>
            <MobileNav />
          </div>

          <div className='md:flex items-center hidden'>
            <Button variant='ghost' className='pl-0'>
              <Avatar className='h-8 w-8 mr-2'>
                <AvatarImage
                  src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-4rLeNeknOMbSBX3pmXovv9olVfe8k6.png'
                  alt='Avatar'
                />
                <AvatarFallback>EG</AvatarFallback>
              </Avatar>
              <span className='font-medium'>Eduardo Gaytan</span>
            </Button>
          </div>

          <div className='hidden md:flex items-center justify-center flex-1'>
            <nav className='flex items-center space-x-6'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className='flex items-center justify-end space-x-4 ml-auto md:ml-0'>
            <CommandMenu>
              <Button
                variant='ghost'
                size='icon'
                className='md:hidden'
                aria-label='Open command menu'
              >
                <Search className='h-5 w-5' />
              </Button>
            </CommandMenu>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
