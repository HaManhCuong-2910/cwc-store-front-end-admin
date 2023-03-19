import { instance } from '../axios'
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
  size: number
  quantity: number
  _id: string
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
export const getDetailProduct = async (query?: TGetListProducts) => {
  return await instance.get<TProduct>('/post', {
    params: query
  })
}

export const getListProducts = async (query?: TGetListProducts) => {
  try {
    const res: any = await instance.get<{
      data: TProduct[]
      page: number
      count: number
      maxPrices: number
    }>('/post/list', {
      params: query
    })

    return [res, null]
  } catch (error) {
    return [null, error]
  }
}
