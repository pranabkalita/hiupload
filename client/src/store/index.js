import { createStore } from 'vuex'
import auth from './auth'
import files from './files'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    files,
  },
})
