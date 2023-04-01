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

export const indexMethod = (index: number, currentPage: number, limit?: number) => {
  return (currentPage - 1) * (limit || 10) + index + 1
}

export const validatePhoneNumber = (rule: any, value: any, callback: any) => {
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
  if (value === '') {
    callback(new Error('Vui lòng nhập số điện thoại'))
  }
  if (!regex.test(value)) {
    callback(new Error('Số điện thoại không đúng định dạng'))
  }
  callback()
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
  return Object.entries(obj).reduce(
    (acc, [k, v]) => (v !== '' && v !== undefined && v !== null ? { ...acc, [k]: v } : acc),
    {}
  )
}

export const genderSlugFromString = (str: string) => {
  str = str.toLowerCase()

  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
  str = str.replace(/(đ)/g, 'd')

  str = str.replace(/([^0-9a-z-\s])/g, '')

  str = str.replace(/(\s+)/g, '-')

  str = str.replace(/-+/g, '-')

  str = str.replace(/^-+/g, '')

  str = str.replace(/-+$/g, '')

  return str
}

export enum ETypeScreen {
  CREATE = 'CREATE',
  DETAIL = 'DETAIL',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}
