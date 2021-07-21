import axios from 'axios'

export default {
  namespaced: true,

  state: {
    files: [],
  },

  getters: {
    files(state) {
      return state.files
    },
  },

  mutations: {
    SET_FILES(state, files) {
      state.files = files
    },

    ADD_FILE(state, file) {
      state.files = [file, ...state.files]
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
    },
  },
}
