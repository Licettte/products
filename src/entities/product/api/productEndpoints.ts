import type { ProductsRequestParams, ProductsResponse } from '../model/types'
import { apiGet } from 'shared/api/base'

export const productEndpoints = {
  fetchProducts(params?: ProductsRequestParams) {
    const hasSearch = Boolean(params?.q?.trim())

    return apiGet<ProductsResponse>({
      url: hasSearch ? '/products/search' : '/products',
      params: {
        limit: params?.limit,
        skip: params?.skip,
        q: params?.q?.trim() || undefined,
        sortBy: params?.sortBy,
        order: params?.order,
      },
    })
  },
}
