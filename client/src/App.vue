<template>
  <div class="w-full md:w-8/12 lg:w-6/12 mx-auto px-6 mt-6 md:mt-20">
    <c-snack />
    <c-nav />
    
    <router-view/>
  </div>
</template>

<script>
import cNav from '@/components/cNav';
import cSnack from '@/components/cSnack';

export default {
  components: {
    cNav,
    cSnack
  }
}
</script>

<style src="./assets/styles/app.css" />