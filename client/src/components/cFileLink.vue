<template>
  <a href="#" @click.prevent="getLink" class="inline-block text-sm p-3 text-indigo-500 font-medium">Get sharable link</a>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    file: {
      required: true,
      type: Object
    }
  },

  computed: {
    ...mapGetters({
      fileSharableLink: 'files/fileSharableLink'
    })
  },

  methods: {
    ...mapActions({
      getFileSharableLinkAction: 'files/getFileSharableLink',
      snack: 'snack/snack'
    }),

    async getLink() {
      await this.getFileSharableLinkAction(this.file.uuid)

      this.copyLinkToClipboard()
    },

    copyLinkToClipboard() {
      let dummy = document.createElement('input')
      dummy.value = this.fileSharableLink

      document.body.appendChild(dummy)
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)

      this.snack('Copied to clipboard !')
    }
  }
}
</script>