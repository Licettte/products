import type { CellContext } from '@tanstack/react-table'
import PlusIcon from 'shared/assets/PlusIcon.svg?react'
import { ColorButton } from 'shared/ui/button'
import styles from 'widgets/product/ui/Product.module.scss'

import type { Product } from '../../../model/types'

type AddCellProps = CellContext<Product, unknown>

export const AddCell = ({ row }: AddCellProps) => {
  return (
    <ColorButton width={40} height={40} radius={14}>
      <PlusIcon />
    </ColorButton>
  )
}
