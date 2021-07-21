<template>
  <div class="flex items-center justify-between border-b-2 border-gray-100">
    <div class="text-sm truncate overflow-ellipses w-6/12">{{ file.name }}</div>
    <div class="-mr-3 flex items-center">
      <a href="" class="inline-block text-sm p-3 text-indigo-500 font-medium">Get sharable link</a>
      <a href="#" class="inline-block text-sm p-3 text-pink-500 font-medium" @click.prevent="deleteFile">Delete</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'cFile',
  
  props: {
    file: {
      required: true,
      type: Object
    }
  },

  methods: {
    ...mapActions({
      'deleteFileAction': 'files/deleteFile'
    }),

    async deleteFile() {
      if (window.confirm('Really delete this file ?')) {
        await this.deleteFileAction(this.file.uuid)
      }
    }
  }
}
</script>