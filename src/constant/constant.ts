export interface User {
  status: string
  _id: string
  name: string
  email: string
  phoneNumber: string
  password: string
  age: number
  roles: string[]
  type: string
  avatar: any
}

export interface TDataLocation {
  link: string
  value: string
}

export const timeExpireAccessToken = 60 * 60 * 24

export type TDefaultObject = {
  key: string | number
  value: string | number
  class?: string
}

export type TDefaultResponseObject = {
  status: number
  message: string
}

export const formatNumberMoney = (value: number | string) => {
  let valueNumber = value
  if (typeof value !== 'string') {
    valueNumber = Number(value)
  }
  const formater = new Intl.NumberFormat('vi-VN')
  return formater.format(valueNumber as number).split(',')[0]
}

export const removeEmptyValueInObject = (obj: any) => {
  return Object.entries(obj).reduce((acc, [k, v]) => (v ? { ...acc, [k]: v } : acc), {})
}
