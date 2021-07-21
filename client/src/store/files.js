import axios from 'axios'

export default {
  namespaced: true,

  state: {
    files: [],
    usage: 0,
  },

  getters: {
    files(state) {
      return state.files
    },

    usage(state) {
      return state.usage
    },
  },

  mutations: {
    SET_FILES(state, files) {
      state.files = files
    },

    ADD_FILE(state, file) {
      state.files = [file, ...state.files]
    },

    REMOVE_FILE(state, uuid) {
      state.files = state.files.filter((file) => file.uuid !== uuid)
    },

    SET_USAGE(state, usage) {
      state.usage = usage
    },

    INCREMENT_USAGE(state, usage) {
      state.usage = state.usage + usage
    },

    DECREMENT_USAGE(state, usage) {
      state.usage = state.usage - usage
    },
  },

  actions: {
    async getFiles({ commit }) {
      let response = await axios.get('/api/files')

      commit('SET_FILES', response.data.data)
    },

    async storeFile({ commit }, file) {
      const response = await axios.post('/api/files', {
        name: file.filename,
        size: file.fileSize,
        path: file.serverId,
      })

      commit('ADD_FILE', response.data.data)
      commit('INCREMENT_USAGE', file.fileSize)
    },

    async deleteFile({ commit }, file) {
      await axios.delete(`/api/files/${file.uuid}`)

      commit('REMOVE_FILE', file.uuid)
      commit('DECREMENT_USAGE', file.size)
    },

    async getUsage({ commit }) {
      const response = await axios.get('/api/user/usage')

      commit('SET_USAGE', response.data.data.usage)
    },
  },
}
