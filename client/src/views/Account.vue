<template>
  <div>
    <h2 class="font-medium pb-3 border-b-2 border-gray-100 text-gray-800">Subscription</h2>

    <div class="mt-3 text-sm">
      <p>
        You're on the {{ user.plan.name }} plan.
        <template v-if="user.ends_at">Your current subscription ends at {{ user.ends_at }}</template>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'Account',

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
}
</script>
