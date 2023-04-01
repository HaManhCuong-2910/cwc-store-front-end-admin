import type { TDefaultResponseObject } from '@/constant/constant'

export type TQuerySearchAccount = {
  page?: number
  limit?: number
  name?: string
  email?: string
  phoneNumber?: string
  province_id?: number
  district_id?: number
  status?: EStatusAccount
}

export enum EStatusAccount {
  ACTIVE = 'ACTIVE',
  LOCK = 'LOCK'
}

export const listStatusOption = [
  {
    key: EStatusAccount.ACTIVE,
    value: 'Hoạt động',
    class: 'badge bg-success'
  },
  {
    key: EStatusAccount.LOCK,
    value: 'Khóa',
    class: 'badge bg-danger'
  }
]

export enum ETypeAccount {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export const listTypeOption = [
  {
    key: ETypeAccount.USER,
    value: 'Khách hàng'
  },
  {
    key: ETypeAccount.ADMIN,
    value: 'admin'
  }
]

export interface IDataAccountResponse {
  data: IDataAccount[]
  page: number
  count: number
  countRecord: number
}

export interface IDataAccount {
  _id: string
  name: string
  email: string
  phoneNumber: string
  password: string
  avatar: string
  roles: string[]
  status: EStatusAccount
  province_id: number
  district_id: number
  address: string
  type: string
  createdAt: Date
  updatedAt: Date
  __v: number
  public_id_avatar: string
}

export type TGetListRolesResponse = TDefaultResponseObject & { data: string[] }

export type TUpdateAccount = {
  _id?: string
  roles?: string[]
}

export type TCreateAccountForm = {
  name: string
  email: string
  phoneNumber: string
  status: string
  avatar: string | File
  roles: string[]
  address: string
  type: string
  province_id: number | string
  district_id: number | string
  public_id_avatar: string
}
