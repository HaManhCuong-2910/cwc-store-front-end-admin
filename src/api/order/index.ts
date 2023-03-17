import type { IDataOrderResponse } from '@/components/order/data'
import type { TDefaultResponseObject } from '@/constant/constant'
import { instance } from '../axios'

export const getListOrder = async (query?: any) => {
  try {
    const res = await instance.get<IDataOrderResponse>('/cart/list-order', {
      params: query
    })
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}

export const cancelOrderApi = async (id: string) => {
  try {
    const res = await instance.put<TDefaultResponseObject>('/cart/cancel-order', { id })
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}
