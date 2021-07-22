import axios from 'axios'

export default {
  namespaced: true,

  state: {
    files: [],
    usage: 0,
    fileSharableLink: '',
    fileDownloadData: '',
    fileDownloadMeta: '',
  },

  getters: {
    files(state) {
      return state.files
    },

    usage(state) {
      return state.usage
    },

    fileSharableLink(state) {
      return state.fileSharableLink
    },

    fileDownloadData(state) {
      return state.fileDownloadData
    },

    fileDownloadMeta(state) {
      return state.fileDownloadMeta
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

    SET_FILE_SHARABLE_LINK(state, url) {
      state.fileSharableLink = url
    },

    SET_FILE_DOWNLOAD_DATA(state, data) {
      state.fileDownloadData = data
    },

    SET_FILE_DOWNLOAD_META(state, meta) {
      state.fileDownloadMeta = meta
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

    async getFileSharableLink({ commit }, uuid) {
      const response = await axios.post(`/api/files/${uuid}/links`)

      commit('SET_FILE_SHARABLE_LINK', response.data.data.url)
    },

    async getFile({ commit }, { uuid, token }) {
      const response = await axios.get(
        `/api/files/${uuid}/links?token=${token}`
      )

      commit('SET_FILE_DOWNLOAD_DATA', response.data.data)
      commit('SET_FILE_DOWNLOAD_META', response.data.meta)
    },
  },
}
