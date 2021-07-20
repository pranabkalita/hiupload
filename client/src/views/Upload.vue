<template>
  <div>
    <div class="mb-8">Uploader</div>

    <div>
      <h2 class="font-medium pb-3 border-b-2 border-gray-100 text-gray-800">Your files</h2>

      <template v-if="files.length">
        <c-file v-for="file in files" :key="file.uuid" :file="file" />
      </template>
      <p v-else class="mt-3 text-sm text-gray-800">There are no file here right now !</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import cFile from '@/components/cFile'

export default {
  name: 'Upload',

  components: {
    cFile
  },

  computed: {
    ...mapGetters({
      files: 'files/files'
    })
  },

  methods: {
    ...mapActions({
      getfilesAction: 'files/getFiles'
    })
  },

  mounted() {
    this.getfilesAction();
  }
}
</script>
