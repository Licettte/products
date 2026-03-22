import type { CellContext } from '@tanstack/react-table'

import type { Product } from '../../../../model/types'
import styles from './CheckboxCell.module.scss'

type CheckboxCellProps = CellContext<Product, unknown>

export const CheckboxCell = ({ row }: CheckboxCellProps) => {
  const isSelected = row.getIsSelected()

  const handleChange = () => {
    row.toggleSelected(!isSelected)
  }

  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleChange}
        className={styles.input}
        aria-label={`Выбрать товар ${row.original.title}`}
      />
      <span className={isSelected ? styles.checkboxChecked : styles.checkbox} />
    </label>
  )
}
