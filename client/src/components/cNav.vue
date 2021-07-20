<template>
  <header class="flex flex-wrap md:flex-no-wrap item-center justify-between mb-6 -mx-3 -mt-3">
    <ul class="flex items-center">
      <li class="text-sm inline-block p-3 text-gray-800">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li class="text-sm inline-block p-3 text-gray-800">
        <router-link :to="{ name: 'uploads' }">Your Files</router-link>
      </li>
    </ul>

    <ul class="flex items-center">
      <template v-if="!authenticated">
        <li class="text-sm inline-block p-3 text-gray-800">
          <router-link :to="{ name: 'login' }">Sign in</router-link>
        </li>
        <li class="text-sm inline-block p-3 text-gray-800"><a href="#">Create account</a></li>
      </template>

      <template v-else>
        <li class="text-sm inline-block p-3 text-gray-800"><a href="#">{{ user.name }}</a></li>
        <li class="text-sm inline-block p-3 text-gray-800">
          <a href="#" @click.prevent="logout">Logout</a>
        </li>
      </template>
    </ul>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'cNav',

  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    })
  },

  methods: {
    ...mapActions({
      'logoutAction': 'auth/logout'
    }),

    async logout() {
      await this.logoutAction()

      this.$router.replace({ name: 'home' })
    }
  }
}
</script>