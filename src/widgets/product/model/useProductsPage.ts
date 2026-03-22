import { useCallback, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux'
import {
  selectProducts,
  selectProductsCurrentPage,
  selectProductsError,
  selectProductsIsLoading,
  selectProductsLimit,
  selectProductsOrder, selectProductsRange,
  selectProductsSearch,
  selectProductsSkip,
  selectProductsSortBy,
  selectProductsTotal, selectProductsTotalPages,
} from 'entities/product/model/selectors'
import { fetchProductsAsync } from 'entities/product/model/services/fetchProductsAsync'
import { setPagination } from 'entities/product/model/productsSlice'


export const useProductsPage = () => {
  const dispatch = useAppDispatch()

  const items = useAppSelector(selectProducts)
  const total = useAppSelector(selectProductsTotal)
  const limit = useAppSelector(selectProductsLimit)
  const skip = useAppSelector(selectProductsSkip)
  const search = useAppSelector(selectProductsSearch)
  const sortBy = useAppSelector(selectProductsSortBy)
  const order = useAppSelector(selectProductsOrder)
  const isLoading = useAppSelector(selectProductsIsLoading)
  const error = useAppSelector(selectProductsError)
  const currentPage = useAppSelector(selectProductsCurrentPage)
  const totalPages = useAppSelector(selectProductsTotalPages)
  const range = useAppSelector(selectProductsRange)

  useEffect(() => {
    dispatch(
      fetchProductsAsync({
        limit,
        skip,
        q: search,
        sortBy,
        order,
      }),
    )
  }, [dispatch, limit, skip, search, sortBy, order])

  const changePage = useCallback(
    (page: number) => {
      const safePage = Math.max(1, Math.min(page, totalPages))
      const nextSkip = (safePage - 1) * limit

      dispatch(
        setPagination({
          skip: nextSkip,
        }),
      )
    },
    [dispatch, limit, totalPages],
  )

  const refresh = useCallback(() => {
    dispatch(
      fetchProductsAsync({
        limit,
        skip,
        q: search,
        sortBy,
        order,
      }),
    )
  }, [dispatch, limit, skip, search, sortBy, order])

  return {
    items,
    total,
    limit,
    skip,
    isLoading,
    error,
    currentPage,
    totalPages,
    range,
    changePage,
    refresh,
  }
}
