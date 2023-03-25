import type { TDefaultResponseObject } from '@/constant/constant'
import { instance } from '../axios'
import type {
  IDataAccountResponse,
  TCreateAccountForm,
  TGetListRolesResponse,
  TQuerySearchAccount,
  TUpdateAccount
} from './data'

export const getListAccountApi = async (query?: TQuerySearchAccount) => {
  try {
    const res = await instance.get<IDataAccountResponse>('/account/get-list-account', {
      params: query
    })
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}

export const getListRolesApi = async () => {
  try {
    const res = await instance.get<TGetListRolesResponse>('/account/get-list-roles')
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}

export const updateAccountApi = async (data: TUpdateAccount) => {
  try {
    const res = await instance.post<{}>('/account/update', data)
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}

export const createAccountApi = async (data: TCreateAccountForm) => {
  try {
    const res = await instance.post<{}>('/account/create', data)
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}
