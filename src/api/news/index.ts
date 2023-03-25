import type { TDefaultResponseObject } from '@/constant/constant'
import { instance } from '../axios'
import type { ICreateNewsDto, TGetNewsResponse } from './data'

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

export const getDetailNews = async (id: string) => {
  try {
    const res = (await instance.get<TGetNewsResponse>(`/news/${id}/detail`)).data
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

export const createNewsApi = async (data: ICreateNewsDto) => {
  try {
    const res = await instance.post<{ status: number; data: TGetNewsResponse }>(
      `/news/create`,
      data
    )
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}
export const updateNewsApi = async (data: ICreateNewsDto) => {
  try {
    const res = await instance.put<{ status: number; data: TGetNewsResponse }>(`/news/edit`, data)
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}
