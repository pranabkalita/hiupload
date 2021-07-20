import axios from 'axios'

export default {
  namespaced: true,

  state: {
    authenticated: false,
    user: null,
  },

  getters: {
    authenticated(state) {
      return state.authenticated
    },

    user(state) {
      return state.user
    },
  },

  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value
    },

    SET_USER(state, user) {
      state.user = user
    },
  },

  actions: {
    async login({ dispatch }, credentials) {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/api/login', credentials)

      dispatch('me')
    },

    async me({ commit }) {
      try {
        const user = await axios.get('/api/user')

        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', user.data)
      } catch (e) {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
      }
    },

    async logout({ dispatch }) {
      await axios.post('/api/logout')

      // commit('SET_AUTHENTICATED', false)
      // commit('SET_USER', null)

      // OR

      dispatch('me')
    },
  },
}
