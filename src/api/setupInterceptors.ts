import { refreshToken } from './auth'
import { serviceUser } from './user'
import { instance } from './axios'
import type { AxiosError } from 'axios'
import type { Store } from 'vuex'
import type { Router } from 'vue-router'
import { ElMessage } from 'element-plus'

export const setupInterceptors = (store: Store<any>, router: Router) => {
  instance.interceptors.request.use(
    (config) => {
      const accessToken = serviceUser.getTokenFromClient()
      if (!!accessToken && config.headers) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return config
    },
    (error: AxiosError) => {
      console.log('error', error)
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      const { status, data } = response

      if (status === 200 || status === 201) {
        return response
      }

      return Promise.reject(response)
    },
    async (error: any) => {
      if (error.response?.data?.statusCode === 401) {
        serviceUser.LoginAgain(router)
      }
      if (error.response?.data?.statusCode === 403) {
        ElMessage({
          message: 'Không có quyền truy cập',
          type: 'error',
          duration: 1000
        })
      }
      if (error.response?.data?.statusCode === 406) {
        const [data, errorApi] = await refreshToken()
        if (data.data && !errorApi) {
          const { access_token, user } = data.data
          serviceUser.storeToken({ access_token, user }, store)
          return instance(error.response.config)
        } else {
          serviceUser.LoginAgain(router)
        }
      }
      return Promise.reject(error.response?.data)
    }
  )
}
