<template>
  <div class="w-full md:w-8/12 lg:w-6/12 mx-auto px-6 mt-6 md:mt-20">
    <Nav />
    
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
  components: {
    Nav
  }
}
</script>

<style src="./assets/styles/app.css" />