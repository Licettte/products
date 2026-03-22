import type { CellContext } from '@tanstack/react-table'
import { Flex } from 'shared/ui/flex/Flex'

import type { Product } from '../../../../model/types'
import styles from './TitleCell.module.scss'

type TitleCellProps = CellContext<Product, unknown>

export const TitleCell = ({ row }: TitleCellProps) => {
  const { title, category, images } = row.original

  const imageSrc = images?.[0] || ''

  const handleClick = () => {
    console.log('open product', row.original)
  }

  return (
    <Flex gap={12} align="center" onClick={handleClick}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          width={48}
          height={48}
          style={{
            objectFit: 'cover',
            borderRadius: 8,
            flexShrink: 0,
          }}
        />
      ) : null}

      <Flex dir="column" gap={4}>
        <span className={styles.title}>{title}</span>
        <span className={styles.category}>{category}</span>
      </Flex>
    </Flex>
  )
}
