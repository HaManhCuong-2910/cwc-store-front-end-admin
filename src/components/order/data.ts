import type { TProduct } from '@/api/product/data'

export interface IDataOrderResponse {
  data: OrderItem[]
  page: number
  count: number
  countRecord: number
}

export interface OrderItem {
  _id: string
  name: string
  email: string
  phoneNumber: string
  province: string
  district: string
  address: string
  price: number
  data: DataOrderItem[]
  status: number
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface DataOrderItem {
  id: TProduct
  name: string
  size: number
  size_id: string
  quantity: number
  _id: string
}

export enum EStatusOrder {
  PICKUP_PRODUCT = 0,
  DELIVERY = 1,
  RECEIVED = 2,
  CANCEL = 3
}

export const LStatusOrder = [
  {
    key: EStatusOrder.PICKUP_PRODUCT,
    value: 'Chờ lấy hàng',
    class: 'warning'
  },
  {
    key: EStatusOrder.DELIVERY,
    value: 'Đang giao hàng',
    class: 'primary'
  },
  {
    key: EStatusOrder.RECEIVED,
    value: 'Đã nhận hàng',
    class: 'success'
  },
  {
    key: EStatusOrder.CANCEL,
    value: 'Hủy đơn',
    class: 'danger'
  }
]
