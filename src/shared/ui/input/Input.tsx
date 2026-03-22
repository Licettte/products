import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import styles from './Input.module.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  inputClassName?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputClassName, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className={clsx(styles.wrapper, className)}>
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}

        <input ref={ref} className={clsx(styles.input, inputClassName)} {...props} />

        {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
      </div>
    )
  },
)
