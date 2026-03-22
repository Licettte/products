import type { CellContext } from '@tanstack/react-table'

import type { Product } from '../../../../model/types'
import styles from './PriceCell.module.scss'

const USD_TO_RUB_RATE = 84.8379 //todo  не будем обращаться к банковскому API

type PriceCellProps = CellContext<Product, unknown>

export const PriceCell = ({ getValue }: PriceCellProps) => {
  const rawUsdValue = Number(getValue() ?? 0)
  const rubValue = rawUsdValue * USD_TO_RUB_RATE

  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rubValue)

  const [integerPart, fractionPart = '00'] = formatted.split(', ')

  return (
    <span className={styles.wrapper}>
      {integerPart}
      <span className={styles.fraction}>,{fractionPart}</span>
    </span>
  )
}
