import type { ComponentType, SVGProps } from 'react'
import { Link } from 'react-router-dom'

type RouteIconLinkProps = {
  to: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  className?: string
  iconClassName?: string
}

export const RouteIconLink = ({
  to,
  label,
  Icon,
  className,
  iconClassName,
}: RouteIconLinkProps) => {
  return (
    <Link className={className} to={to} aria-label={label}>
      <Icon className={iconClassName} />
    </Link>
  )
}
