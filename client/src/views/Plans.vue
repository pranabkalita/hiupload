<template>
  <router-link :to="{ name: 'checkout', query: { plan: plan.slug } }" v-for="plan in buyablePlans" :key="plan.slug">
    <c-plan :plan="plan" class="mb-2" />
  </router-link>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import cPlan from '@/components/cPlan'

export default {
  name: 'Plans',

  components: {
    cPlan
  },
  
  computed: {
    ...mapGetters({
      plans: 'plans/plans'
    }),

    buyablePlans() {
      return this.plans.filter(plan => !plan.free)
    }
  },

  methods: {
    ...mapActions({
      getPlansAction: 'plans/getPlans'
    })
  },

  async mounted() {
    await this.getPlansAction()
  }
}
</script>
