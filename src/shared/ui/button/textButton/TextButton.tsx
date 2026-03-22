import clsx from 'clsx'
import type { ButtonHTMLAttributes, FC } from 'react'

type TextButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  title: string
  className?: string
}

export const TextButton: FC<TextButtonProps> = ({ title, className, ...rest }) => {
  return (
    <button className={clsx(className)} {...rest}>
      {title}
    </button>
  )
}
