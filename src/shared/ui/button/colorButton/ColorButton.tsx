import clsx from 'clsx'
import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

import styles from './ColorButton.module.scss'

type ColorButtonVariant = 'primary' | 'light' | 'secondary'

type ColorButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ColorButtonVariant
  radius?: number
  width?: number
  height?: number
  fullWidth?: boolean
}

export const ColorButton = ({
  children,
  className,
  variant = 'primary',
  radius = 16,
  width,
  height,
  fullWidth = false,
  type = 'button',
  style,
  ...props
}: ColorButtonProps) => {
  const customStyle: CSSProperties = {
    ...style,
    borderRadius: `${radius}px`,
    width: fullWidth ? '100%' : width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  }

  return (
    <button
      {...props}
      type={type}
      style={customStyle}
      className={clsx(styles.button, styles[variant], className, fullWidth && styles.fullWidth)}
    >
      {children}
    </button>
  )
}
