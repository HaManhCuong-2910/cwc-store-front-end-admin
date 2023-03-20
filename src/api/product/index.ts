import type { TDefaultResponseObject } from '@/constant/constant'
import { instance } from '../axios'
import type { ICreateProductDto, TGetListProducts, TProduct } from './data'
export const getDetailProduct = async (query?: TGetListProducts) => {
  try {
    const res: any = await instance.get<TProduct>('/post', {
      params: query
    })
    return [res, null]
  } catch (error) {
    return [null, error]
  }
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

export const createProductApi = async (data: ICreateProductDto) => {
  try {
    const res: any = await instance.post<{
      status: number
      message: string
      data: TProduct
    }>('/post/create', data)

    return [res, null]
  } catch (error) {
    return [null, error]
  }
}

export const updateProductApi = async (data: ICreateProductDto, id: string) => {
  try {
    const res: any = await instance.put<{
      status: number
      message: string
      data: TProduct
    }>(`/post/${id}`, data)

    return [res, null]
  } catch (error) {
    return [null, error]
  }
}

export const deleteProductApi = async (id: string) => {
  try {
    const res: any = await instance.delete<TDefaultResponseObject>(`/post/${id}`)

    return [res, null]
  } catch (error) {
    return [null, error]
  }
}
