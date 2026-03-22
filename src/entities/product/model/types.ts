export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  thumbnail: string
  images: string[]
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type ProductSortBy = 'title' | 'price' | 'rating' | 'brand' | 'category'
export type ProductSortOrder = 'asc' | 'desc'

export type ProductsRequestParams = {
  limit?: number
  skip?: number
  q?: string
  sortBy?: ProductSortBy
  order?: ProductSortOrder
}

export type ProductsState = {
  items: Product[]
  total: number
  limit: number
  skip: number
  search: string
  sortBy?: ProductSortBy
  order?: ProductSortOrder
  isLoading: boolean
  error: string | null
}
