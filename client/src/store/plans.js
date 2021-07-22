import axios from 'axios'

export default {
  namespaced: true,

  state: {
    plans: [],
  },

  getters: {
    plans(state) {
      return state.plans
    },
  },

  mutations: {
    SET_PLANS(state, plans) {
      state.plans = plans
    },
  },

  actions: {
    async getPlans({ commit }) {
      const response = await axios.get('/api/plans')

      commit('SET_PLANS', response.data.data)
    },
  },
}
