import type { EStatusOrder, IDataOrderResponse } from '@/components/order/data'
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

export const ChangeStatusOrder = async (data: { id: string; status: EStatusOrder }) => {
  try {
    const res = await instance.put<TDefaultResponseObject>('/cart/change-status-order', data)
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}

export const removeOrder = async (id: string) => {
  try {
    const res = await instance.delete<TDefaultResponseObject>(`/cart/${id}/remove-order`)
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}
