import type { ColumnDef } from '@tanstack/react-table'
import { PriceCell } from 'widgets/product/table/ui/cells/priceCell/PriceCell'
import { RatingCell } from 'widgets/product/table/ui/cells/ratingCell/RatingCell'

import type { Product } from '../model/types'
import { AddCell } from '../table/ui/cells/AddCell'
import { CustomCell } from '../table/ui/cells/CustomCell'
import { HeaderCheckboxCell } from '../table/ui/header/HeaderCheckbox'
import { PriceHeaderCell } from '../table/ui/header/PriceHeaderCell'
import { CheckboxCell } from './ui/cells/checkboxCell/CheckboxCell'
import { TextCell } from './ui/cells/textCell/TextCell'
import { TitleCell } from './ui/cells/titleCell/TitleCell'
import { HeaderCell } from './ui/header/headerCell/HeaderCell'

export const productColumns: ColumnDef<Product>[] = [
  {
    id: 'checkbox',
    size: 40,
    header: HeaderCheckboxCell,
    cell: CheckboxCell,
    enableSorting: false,
  },
  {
    id: 'title',
    accessorKey: 'title',
    size: 500,
    header: () => <HeaderCell title="Наименование" />,
    cell: TitleCell,
  },
  {
    id: 'brand',
    accessorKey: 'brand',
    size: 262,
    header: () => <HeaderCell title="Вендор" />,
    cell: TextCell,
  },
  {
    id: 'sku',
    accessorKey: 'sku',
    size: 260,
    header: () => <HeaderCell title="Артикул" />,
    cell: TextCell,
  },
  {
    id: 'rating',
    accessorKey: 'rating',
    size: 220,
    header: () => <HeaderCell title="Оценка" />,
    cell: RatingCell,
  },
  {
    id: 'price',
    accessorKey: 'price',
    size: 220,
    header: PriceHeaderCell,
    cell: PriceCell,
  },
  {
    id: 'add',
    size: 100,
    header: () => <HeaderCell title="" />,
    cell: AddCell,
  },
  {
    id: 'custom',
    size: 120,
    header: () => <HeaderCell title="" />,
    cell: CustomCell,
  },
]
