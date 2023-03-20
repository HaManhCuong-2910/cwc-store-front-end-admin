export interface ICreateProductDto {
  _id?: string
  name: string
  description: string
  price: number | string
  sales: number | string
  sales_percent: number | string
  images: string[] | { name: string; url: string }[]
  is_hot: boolean
  quantities: Quantity[]
  category: string
  slug: string
}

export interface TGetListProducts {
  page?: number
  limit?: number
  name?: string
  description?: string
  price?: number
  sales?: number
  sales_percent?: number
  images?: string[]
  is_hot?: boolean
  quantities?: Quantity[]
  category?: string
  slug?: string
}

export type Quantity = {
  size: number | string
  quantity: number | string
  _id?: string
}

export type TProduct = {
  _id: string
  name: string
  description: string
  is_hot: boolean
  category: Category
  price: number
  sales: number
  sales_percent: number
  slug: string
  images: string[]
  quantities: Quantity[]
  createdAt: string
  updatedAt: string
  __v: number
}

export type Category = {
  _id: string
  name: string
  slug: string
  parent: string
  createdAt: string
  updatedAt: string
  __v: number
}
