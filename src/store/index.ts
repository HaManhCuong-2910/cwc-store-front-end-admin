import { createStore } from 'vuex'
import { handleActions } from './actions'
import { handleGetters } from './getters'
import { handleMutations } from './mutations'
import { handleState } from './state'
import VuexPersistence from 'vuex-persist'

const vuexPersist = new VuexPersistence({
  key: 'store',
  storage: window.localStorage,
  reducer: (state: any) => ({
    user: state.user
  })
})

export default createStore({
  state: handleState,
  getters: handleGetters,
  mutations: handleMutations,
  actions: handleActions,
  plugins: [vuexPersist.plugin]
})
