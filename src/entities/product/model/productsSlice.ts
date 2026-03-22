import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { fetchProductsAsync } from './services/fetchProductsAsync'
import type {
  ProductSortBy,
  ProductSortOrder,
  ProductsState,
} from './types'

export const DEFAULT_LIMIT = 5

const initialState: ProductsState = {
  items: [],
  total: 0,
  limit: DEFAULT_LIMIT,
  skip: 0,
  search: '',
  sortBy: undefined,
  order: undefined,
  isLoading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.skip = 0
    },

    setPagination(state, action: PayloadAction<{ skip: number }>) {
      state.skip = action.payload.skip
    },

    setSorting(
      state,
      action: PayloadAction<{
        sortBy?: ProductSortBy
        order?: ProductSortOrder
      }>,
    ) {
      state.sortBy = action.payload.sortBy
      state.order = action.payload.order
      state.skip = 0
    },

    resetProductsState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.products
        state.total = action.payload.total
        state.skip = action.payload.skip
        state.limit = DEFAULT_LIMIT
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) ?? 'Не удалось загрузить товары'
      })
  },
})

export const {
  setSearch,
  setPagination,
  setSorting,
  resetProductsState,
} = productsSlice.actions

export const productsReducer = productsSlice.reducer
