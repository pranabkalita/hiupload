import { createStore } from 'vuex'

import auth from './auth'
import files from './files'
import plans from './plans'
import stripe from './stripe'
import snack from './snack'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    files,
    plans,
    stripe,
    snack,
  },
})
