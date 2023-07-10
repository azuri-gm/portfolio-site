import { type ReactNode } from 'react'
import { Balancer } from 'react-wrap-balancer'

type BalancedTitleProps = {
  children: ReactNode
  className?: string
}

export const BalancedTitle = ({ children, className }: BalancedTitleProps) => {
  return <Balancer className={className}>{children}</Balancer>
}
