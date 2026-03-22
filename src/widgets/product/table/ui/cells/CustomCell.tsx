import type { CellContext } from '@tanstack/react-table'

import type { Product } from '../../../model/types'

type CustomCellProps = CellContext<Product, unknown>

export const CustomCell = ({ row }: CustomCellProps) => {
  return (
    <button type="button" onClick={() => console.log('custom action', row.original.id)}>
      Custom
    </button>
  )
}
