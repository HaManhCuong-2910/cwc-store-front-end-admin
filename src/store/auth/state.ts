import type { User } from '@/constant/constant'

export type TAuthState = {
  user: User | null
}

export const handleAuthState: TAuthState = {
  user: null
}
