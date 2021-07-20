<template>
  <div class="w-full md:w-8/12 lg:w-6/12 mx-auto px-6 mt-6 md:mt-20">
    <c-nav />
    
    <router-view/>
  </div>
</template>

<script>
import cNav from '@/components/cNav';

export default {
  components: {
    cNav
  }
}
</script>

<style src="./assets/styles/app.css" />