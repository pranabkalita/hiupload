<template>
  <header class="flex flex-wrap md:flex-no-wrap item-center justify-between mb-6 -mx-3 -mt-3">
    <ul class="flex items-center">
      <li class="text-sm inline-block px-3 py-2 text-gray-800">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li class="text-sm inline-block px-3 py-2 text-gray-800">
        <router-link :to="{ name: 'uploads' }">Your Files</router-link>
      </li>
    </ul>

    <div class="flex justify-center order-last w-full md:w-auto md:order-none">
      <c-usage v-if="authenticated" />
    </div>

    <ul class="flex items-center">
      <template v-if="!authenticated">
        <li class="text-sm inline-block px-3 py-2 text-gray-800">
          <router-link :to="{ name: 'login' }">Sign in</router-link>
        </li>
        <li class="text-sm inline-block px-3 py-2 text-gray-800"><a href="#">Create account</a></li>
      </template>

      <template v-else>
        <li class="text-sm inline-block px-3 py-2 text-gray-800"><a href="#">{{ user.name }}</a></li>
        <li class="text-sm inline-block px-3 py-2 text-gray-800">
          <a href="#" @click.prevent="logout">Logout</a>
        </li>
      </template>

      <li v-if="!authenticated || !user.subscribed">
        <router-link :to="{ name: 'plans' }" class="text-sm inline-block px-3 py-2 text-indigo-500">Upgrade ✨</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import cUsage from '@/components/cUsage'

export default {
  name: 'cNav',

  components: {
    cUsage
  },

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