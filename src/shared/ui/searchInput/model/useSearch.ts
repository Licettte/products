import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux'
import { fetchProductsAsync } from 'entities/product/model/services/fetchProductsAsync'
import {
  selectProductsLimit,
  selectProductsOrder,
  selectProductsSearch,
  selectProductsSortBy,
} from 'entities/product/model/selectors'
import { setSearch } from 'entities/product/model/productsSlice'


export const useProductsSearch = () => {
  const dispatch = useAppDispatch()

  const search = useAppSelector(selectProductsSearch)
  const limit = useAppSelector(selectProductsLimit)
  const sortBy = useAppSelector(selectProductsSortBy)
  const order = useAppSelector(selectProductsOrder)

  const changeSearch = useCallback(
    (value: string) => {
      dispatch(setSearch(value))
    },
    [dispatch],
  )

  const applySearch = useCallback(
    (value: string) => {
      dispatch(
        fetchProductsAsync({
          limit,
          skip: 0,
          q: value,
          sortBy,
          order,
        }),
      )
    },
    [dispatch, limit, sortBy, order],
  )

  return {
    search,
    changeSearch,
    applySearch,
  }
}
