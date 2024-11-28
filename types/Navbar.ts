export type NavbarItem = {
  href: string
  label: string
}

export type ListItemProps = {
  slug: string
  link: NavbarItem
  isActive: boolean
}
