import type { User } from '@/constant/constant'

type TAuthMutations = {
  setUserData: (state: any, user: User | null) => void

  logOut: (state: any) => void
  updateUserInfo: (state: any, user: User) => void
}

const setUserData = (state: any, user: User | null) => {
  state.user = user
}

const updateUserInfo = (state: any, user: User) => {
  state.user = user
}

const logOut = (state: any) => {
  state.user = null
}

export const handleAuthMutations: TAuthMutations = {
  setUserData,
  logOut,
  updateUserInfo
}
