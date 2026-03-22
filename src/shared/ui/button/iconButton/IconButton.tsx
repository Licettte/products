import clsx from 'clsx'
import { ButtonHTMLAttributes, type ComponentType, type SVGProps } from 'react'

import styles from './IconButton.module.scss'

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  title?: string
  iconClassName?: string
  classNameButton?: string
}

export const IconButton = ({
  Icon,
  className,
  iconClassName,
  type = 'button',
  ...props
}: IconButtonProps) => {
  return (
    <button {...props} type={type} className={className}>
      <Icon className={clsx(styles.icon, iconClassName)} />
    </button>
  )
}
