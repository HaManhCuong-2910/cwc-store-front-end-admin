import type { TDefaultResponseObject } from '@/constant/constant'
import { instance } from '../axios'
import type { IGetCategoriesResponse } from './data'

export const getListCategories = async (query?: any) => {
  try {
    const res = await instance.get<IGetCategoriesResponse[]>('/category/list', {
      params: query
    })
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}

export const updateCategory = async (data: any) => {
  try {
    const res = await instance.post<any>('/category/create', data)
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}

export const deleteCategoryApi = async (id: string) => {
  try {
    const res = await instance.delete<any>(`/category/${id}/delete`)
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}
