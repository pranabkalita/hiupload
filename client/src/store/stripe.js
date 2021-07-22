import axios from 'axios'

export default {
  namespaced: true,

  state: {
    paymentIntentSecret: '',
  },

  getters: {
    paymentIntentSecret(state) {
      return state.paymentIntentSecret
    },
  },

  mutations: {
    SET_PAYMENT_INTENT_SECRET(state, secret) {
      state.paymentIntentSecret = secret
    },
  },

  actions: {
    async getPaymentIntentSecret({ commit }) {
      const response = await axios.get('/api/subscriptions/intent')

      commit('SET_PAYMENT_INTENT_SECRET', response.data.data)
    },

    async createSubscription({ dispatch }, data) {
      await axios.post('/api/subscriptions', data)

      dispatch('auth/me', {}, { root: true })
    },
  },
}
