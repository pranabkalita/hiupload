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

      <button type="submit" class="bg-indigo-500 text-white px-4 py-3 leading-none rounded-lg font-medium">
        Login
      </button>
    </form>

    <p class="text-sm text-gray-800">Not joined yet ? <a href="#" class="text-indigo-500">Create an account</a></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',

  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  
  methods: {
    ...mapActions({
      loginAction: 'auth/login'
    }),

    async login() {
      await this.loginAction(this.form)
      this.$router.replace({ name: 'home' })
    }
  }
}
</script>
