'use client'

import type { DialogProps } from '@radix-ui/react-dialog'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { BookOpen, Home, Laptop, Search, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

const navItems = [
  {
    heading: 'Navigation',
    items: [
      { icon: Home, label: 'Home', href: '/' },
      { icon: User, label: 'About', href: '/about' },
      { icon: Laptop, label: 'Uses', href: '/uses' },
      { icon: BookOpen, label: 'Blog', href: '/blog' },
    ],
  },
]

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      <DialogContent className="overflow-hidden p-0">
        <CommandPrimitive className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none"
              placeholder="Type a command or search..."
            />
          </div>
          <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <CommandPrimitive.Empty>No results found.</CommandPrimitive.Empty>
            {navItems.map(group => (
              <CommandPrimitive.Group key={group.heading} heading={group.heading}>
                {group.items.map(item => (
                  <CommandPrimitive.Item
                    key={item.label}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            ))}
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}
