import { RootState } from 'app/store'

export const selectProducts = (state: RootState) => state.products.items
export const selectProductsTotal = (state: RootState) => state.products.total
export const selectProductsLimit = (state: RootState) => state.products.limit
export const selectProductsSkip = (state: RootState) => state.products.skip
export const selectProductsSearch = (state: RootState) => state.products.search
export const selectProductsSortBy = (state: RootState) => state.products.sortBy
export const selectProductsOrder = (state: RootState) => state.products.order
export const selectProductsIsLoading = (state: RootState) => state.products.isLoading
export const selectProductsError = (state: RootState) => state.products.error

export const selectProductsCurrentPage = (state: RootState) => {
  const { skip, limit } = state.products

  return Math.floor(skip / limit) + 1
}

export const selectProductsTotalPages = (state: RootState) => {
  const { total, limit } = state.products

  return total > 0 ? Math.ceil(total / limit) : 1
}

export const selectProductsRange = (state: RootState) => {
  const { total, skip, limit, items } = state.products

  if (total === 0 || items.length === 0) {
    return { from: 0, to: 0 }
  }

  return {
    from: skip + 1,
    to: Math.min(skip + limit, total),
  }
}
