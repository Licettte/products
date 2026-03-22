import { createAsyncThunk } from '@reduxjs/toolkit'


import { productEndpoints } from '../../api/productEndpoints'
import type { ProductsRequestParams } from '../types'
import { handleError } from 'shared/lib/utils'
import { ResponseErrorBody } from 'shared/api/base'

const getActionName = (action: string) => `products/${action}`

export const fetchProductsAsync = createAsyncThunk(
  getActionName('fetch'),
  async (params: ProductsRequestParams | undefined, { rejectWithValue }) => {
    try {
      return await productEndpoints.fetchProducts(params)
    } catch (error) {
      handleError(error)

      return rejectWithValue((error as ResponseErrorBody).message)
    }
  },
)
