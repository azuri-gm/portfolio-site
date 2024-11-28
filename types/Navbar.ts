export type NavbarItem = {
  href: string
  label: string
}

export type ListItemProps = {
  key: string
  link: NavbarItem
  isActive: boolean
}
