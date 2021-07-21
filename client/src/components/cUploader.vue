<template>
  <input type="file" name="file" id="file" ref="file" multiple>
</template>

<script>
import * as Filepond from 'filepond'

export default {
  mounted() {
    const pond = Filepond.create(this.$refs.file)
  }
}
</script>