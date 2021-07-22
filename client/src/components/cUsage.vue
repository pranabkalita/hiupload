<template>
  <span class="inline-block text-sm font-medium text-gray-800 py-1 px-2 rounded-lg bg-gray-200 text-center">
    Usage: {{ usageFormatted }} / {{ storageFormatted }} ({{ percentageUsed }}%)
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import filesize from 'filesize'

export default {
  name: 'cUsage',

  computed: {
    ...mapGetters({
      usage: 'files/usage',
      user: 'auth/user'
    }),

    usageFormatted() {
      return filesize(this.usage)
    },

    storageFormatted() {
      return filesize(this.user.plan.storage)
    },

    percentageUsed() {
      return ((this.usage / this.user.plan.storage) * 100).toFixed(2)
    }
  },

  methods: {
    ...mapActions({
      getUsageAction: 'files/getUsage'
    })
  },

  mounted () {
    this.getUsageAction()
  }
}
</script>