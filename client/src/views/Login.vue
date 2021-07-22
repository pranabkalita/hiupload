<template>
  <div class="w-10/12 md:w-6/12 mx-auto">
    <form action="" @submit.prevent='login' class="mb-8">
      <div class="mb-6">
        <div class="mb-3">
          <label for="email" class="inline-block text-sm mb-2">Email</label>
          <input type="text" id="email" v-model="form.email" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md">
        </div>

        <div class="mb-3">
          <label for="password" class="inline-block text-sm mb-2">Password</label>
          <input type="password" id="password" v-model="form.password" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md">
        </div>
      </div>

      <c-button title="Login" type="submit" :loading="loading" :disabled="loading" />
    </form>

    <p class="text-sm text-gray-800">Not joined yet ? <a href="#" class="text-indigo-500">Create an account</a></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import cButton from '@/components/cButton'

export default {
  name: 'Login',

  components: {
    cButton
  },

  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  
  methods: {
    ...mapActions({
      loginAction: 'auth/login'
    }),

    async login() {
      this.loading = true

      try {
        await this.loginAction(this.form)
        
        this.loading = false

        this.$router.replace({ name: 'home' })
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
