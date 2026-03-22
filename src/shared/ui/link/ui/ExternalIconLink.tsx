import type { ComponentType, SVGProps } from 'react'

type IconLinkProps = {
  href: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  className?: string
  iconClassName?: string
  newTab?: boolean
}

export const ExternalIconLink = ({
  href,
  label,
  Icon,
  className,
  iconClassName,
  newTab = true,
}: IconLinkProps) => {
  const target = newTab ? '_blank' : undefined
  const rel = newTab ? 'noopener noreferrer' : undefined

  return (
    <a className={className} href={href} aria-label={label} target={target} rel={rel}>
      <Icon className={iconClassName} />
    </a>
  )
}
