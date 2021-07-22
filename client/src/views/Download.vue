<template>
  <div class="p-12 rounded-lg bg-gray-100 text-center" v-if="fileDownloadMeta">
    <h1 class="text-xl font-medium mb-3 texy-gray-700">{{ fileDownloadData.name }}</h1>

    <c-button title="Download this file" type="button" @click="download" />
  </div>

  <div v-if="error">
    <p class="text-sm text-center text-gray-800">Sorry, this file is not available.</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import cButton from '@/components/cButton'

export default {
  name: 'Download',

  props: {
    uuid: { required: true, type: String },
    token: { required: true, type: String },
  },

  components: {
    cButton
  },

  data() {
    return {
      error: false
    }
  },

  computed: {
    ...mapGetters({
      fileDownloadData: 'files/fileDownloadData',
      fileDownloadMeta: 'files/fileDownloadMeta',
    })
  },

  methods: {
    ...mapActions({
      getFileAction: 'files/getFile'
    }),

    download() {
      let dummy = document.createElement('a')

      dummy.href = this.fileDownloadMeta.url
      document.body.appendChild(dummy)

      dummy.click()
      document.removeChild(dummy)
    }
  },

  async mounted() {
    try {
      await this.getFileAction({
        uuid: this.uuid,
        token: this.token
      })
    } catch (e) {
      this.error = true
    }
  }
}
</script>
