import type { TDefaultResponseObject } from '@/constant/constant'
import { instance } from '../axios'
import type { TGetNewsResponse } from './data'

export const getListNewsApi = async (query?: any) => {
  try {
    const res = await instance.get<TGetNewsResponse[]>('/news/list', {
      params: query
    })
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}

export const deleteNewsApi = async (id: string) => {
  try {
    const res = await instance.delete<TDefaultResponseObject>(`/news/${id}/delete`)
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}
