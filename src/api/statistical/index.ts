import { instance } from '../axios'
import type { TgetStatisticalAll } from './data'

export const getStatisticalAll = async (query?: any) => {
  try {
    const res = await instance.get<TgetStatisticalAll>('/statistical/count/all', {
      params: query
    })
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}
