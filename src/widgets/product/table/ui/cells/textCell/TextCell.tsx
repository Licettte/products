import type { CellContext } from '@tanstack/react-table'

import type { Product } from '../../../../model/types'
import styles from './TextCell.module.scss'

type TextCellProps = CellContext<Product, unknown>

export const TextCell = ({ getValue }: TextCellProps) => {
  const value = getValue()

  return <span className={styles.text}>{String(value ?? '')}</span>
}
