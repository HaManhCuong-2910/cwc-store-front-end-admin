import { instance } from '../axios'
import type { IDataFormLogin } from './data'

export const Login = async (data: IDataFormLogin) => {
  try {
    const res = await instance.post<any>('/auth/login', data)
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}

export const Logout = async () => {
  try {
    const res = await instance.post<any>('/auth/logout')
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}

export const refreshToken = async () => {
  try {
    const res = await instance.post<any>('/auth/refresh_access_token')
    return [res, null]
  } catch (err: any) {
    return [null, err]
  }
}
