import clsx from 'clsx'
import { ChangeEventHandler, ComponentProps } from 'react'
import ClearIcon from 'shared/assets/ClearIcon.svg?react'
import SearchIcon from 'shared/assets/SearchIcon.svg?react'
import { IconButton } from 'shared/ui/button/iconButton/IconButton'

import { Input } from '../../input/Input'
import styles from './SearchInput.module.scss'

type SearchInputProps = ComponentProps<typeof Input> & {
  value: string
  onChangeValue?: (value: string) => void
  onClear?: () => void
}

export const SearchInput = ({
  className,
  value,
  onChangeValue,
  onClear,
  placeholder = 'Найти',
  ...props
}: SearchInputProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onChangeValue?.(target.value)
  }

  return (
    <Input
      {...props}
      className={clsx(styles.searchInput, className)}
      inputClassName={styles.input}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      leftIcon={<SearchIcon className={styles.searchIcon} />}
      rightIcon={
        value ? (
          <IconButton Icon={ClearIcon} onClick={onClear} className={styles.clearIcon} />
        ) : null
      }
    />
  )
}
