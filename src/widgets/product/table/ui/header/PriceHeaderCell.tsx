import { setSorting } from 'entities/product/model/productsSlice'
import { selectProductsOrder, selectProductsSortBy } from 'entities/product/model/selectors'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux'

import styles from './headerCell/HeaderCell.module.scss'
export const PriceHeaderCell = () => {
  const dispatch = useAppDispatch()
  const sortBy = useAppSelector(selectProductsSortBy)
  const order = useAppSelector(selectProductsOrder)

  const isActive = sortBy === 'price'

  const handleClick = useCallback(() => {
    const nextOrder = !isActive ? 'asc' : order === 'asc' ? 'desc' : 'asc'

    dispatch(
      setSorting({
        sortBy: 'price',
        order: nextOrder,
      }),
    )
  }, [dispatch, isActive, order])

  return (
    <button type="button" onClick={handleClick}>
      <span
        className={styles.text}
      >{`Цена, ₽  𝄞 ${isActive ? (order === 'asc' ? ' ↑' : ' ↓') : ''}`}</span>
    </button>
  )
}
