import type { HeaderContext } from '@tanstack/react-table'

import type { Product } from '../../../model/types'
import styles from '../cells/checkboxCell/CheckboxCell.module.scss'

type HeaderCheckboxCellProps = HeaderContext<Product, unknown>

export const HeaderCheckboxCell = ({ table }: HeaderCheckboxCellProps) => {
  const isAllSelected = table.getIsAllPageRowsSelected()

  const handleChange = () => {
    table.toggleAllPageRowsSelected(!isAllSelected)
  }

  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        checked={isAllSelected}
        onChange={handleChange}
        className={styles.input}
        aria-label="Выбрать все товары на странице"
      />
      <span className={isAllSelected ? styles.checkboxChecked : styles.checkbox} />
    </label>
  )
}
