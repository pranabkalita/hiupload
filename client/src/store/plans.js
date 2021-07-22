import axios from 'axios'

export default {
  namespaced: true,

  state: {
    plans: [],
    planAvailability: {},
  },

  getters: {
    plans(state) {
      return state.plans
    },

    planAvailability(state) {
      return state.planAvailability
    },
  },

  mutations: {
    SET_PLANS(state, plans) {
      state.plans = plans
    },

    SET_PLAN_AVAILABILITY(state, planAvailability) {
      state.planAvailability = planAvailability
    },
  },

  actions: {
    async getPlans({ commit }) {
      const response = await axios.get('/api/plans')

      commit('SET_PLANS', response.data.data)
    },

    async getPlanAvailability({ commit }) {
      const response = await axios.get('/api/user/plan_availability')

      commit('SET_PLAN_AVAILABILITY', response.data.data)
    },

    async swapPlan({ dispatch }, data) {
      await axios.patch('/api/subscriptions', data)

      dispatch('auth/me', {}, { root: true })
    },
  },
}
