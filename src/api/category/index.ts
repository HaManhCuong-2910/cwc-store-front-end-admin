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
