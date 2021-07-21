<template>
  <div>
    <div v-if="errors.size" class="bg-red-300 px-4 py-2 rounded-lg text-sm text-gray-800 mb-4">
      {{ errors.size[0] }}
    </div>

    <div class="mb-8">
      <c-uploader @onProcessFile="storeFile" @validation="setValidationErrors" />
    </div>

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
import cUploader from '@/components/cUploader'

export default {
  name: 'Upload',

  components: {
    cFile,
    cUploader
  },

  data() {
    return {
      errors: {}
    }
  },

  computed: {
    ...mapGetters({
      files: 'files/files'
    })
  },

  methods: {
    ...mapActions({
      getfilesAction: 'files/getFiles',
      storeFileAction: 'files/storeFile',
    }),

    async storeFile(file) {
      await this.storeFileAction(file)
    },

    setValidationErrors(errors) {
      this.errors = errors
    }
  },

  mounted() {
    this.getfilesAction();
  }
}
</script>
