import { timeExpireAccessToken, type User } from '@/constant/constant'
import { inject } from 'vue'
import { useCookies } from 'vue3-cookies'
import type { Router } from 'vue-router'
import type { Store } from 'vuex'
import type { IFormUserInfo } from '../auth/data'
import { instance } from '../axios'

const { cookies } = useCookies()

const getTokenFromClient = () => {
  return cookies.get('access_token')
}

const storeToken = (
  data: {
    access_token: string
    user: User | null
  },
  store: Store<any>
) => {
  cookies.set('access_token', data.access_token, timeExpireAccessToken)
  store.commit('setUserData', data.user)
  return
}

const LoginAgain = (router: Router) => {
  router.push({
    name: 'Login'
  })
}

const updateUserInfoApi = async (data: IFormUserInfo & { avatar: string }, _id: string) => {
  try {
    const res = (
      await instance.post('/account/update', {
        ...data,
        ...{ _id }
      })
    ).data
    return [res, null]
  } catch (error) {
    return [null, error]
  }
}

export const serviceUser = {
  getTokenFromClient,
  storeToken,
  LoginAgain,
  updateUserInfoApi
}
