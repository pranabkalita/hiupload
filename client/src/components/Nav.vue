<template>
  <header class="flex flex-wrap md:flex-no-wrap item-center justify-between mb-6 -mx-3 -mt-3">
    <ul class="flex items-center">
      <li class="text-sm inline-block p-3 text-gray-800">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li class="text-sm inline-block p-3 text-gray-800"><a href="#">Files</a></li>
    </ul>

    <ul class="flex items-center">
      <li class="text-sm inline-block p-3 text-gray-800">
        <router-link :to="{ name: 'login' }">Sign in</router-link>
      </li>
      <li class="text-sm inline-block p-3 text-gray-800"><a href="#">Create account</a></li>
    </ul>
  </header>
</template>