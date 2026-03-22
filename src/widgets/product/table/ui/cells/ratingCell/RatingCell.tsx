import type { CellContext } from '@tanstack/react-table'

import type { Product } from '../../../../model/types'
import styles from './RatingCell.module.scss'

type RatingCellProps = CellContext<Product, unknown>

export const RatingCell = ({ getValue }: RatingCellProps) => {
  const value = Number(getValue() ?? 0)
  const isLowRating = value < 3

  return <span className={isLowRating ? styles.lowRating : styles.rating}>{value}</span>
}
