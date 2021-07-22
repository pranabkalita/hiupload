import { createStore } from 'vuex'

import auth from './auth'
import files from './files'
import plans from './plans'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    files,
    plans,
  },
})
