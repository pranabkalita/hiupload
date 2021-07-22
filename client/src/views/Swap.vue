<template>
  <form @submit.prevent="swap">
    <div class="mb-6">
      <div class="mb-2 flex items-center" v-for="plan in plans" :key="plan.slug">
        <input v-if="canSwapToPlan(plan)" type="radio" name="plan" :id="`plan_${plan.slug}`" v-model="form.plan" :value="plan.slug" class="mr-3">
        <label :for="`plan_${plan.slug}`" class="flex-grow">
          <c-plan :plan="plan" />
        </label>
      </div>
    </div>

    <button type="submit" v-if="availablePlans.length" class="bg-indigo-500 text-white px-4 py-3 leading-none rounded-lg font-medium">
      Swap
    </button>
    <p v-else class="text-gray-800 text-sm">There are no available plans for you to swap right now, because you're using too much storage.</p>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import cPlan from '@/components/cPlan'

export default {
  name: 'Swap',

  components: {
    cPlan
  },

  data() {
    return {
      form: {
        plan: null
      }
    }
  },
  
  computed: {
    ...mapGetters({
      user: 'auth/user',
      plans: 'plans/plans',
      planAvailability: 'plans/planAvailability',
    }),

    availablePlans() {
      return this.plans.filter(
        plan => plan.slug !== this.user.plan.slug && this.planAvailability[plan.slug]
      )
    }
  },

  methods: {
    ...mapActions({
      getPlansAction: 'plans/getPlans',
      swapPlanAction: 'plans/swapPlan',
      getPlanAvailabilityAction: 'plans/getPlanAvailability',
    }),

    canSwapToPlan(plan) {
      return this.availablePlans.find(p => p.slug === plan.slug)
    },

    async swap() {
      await this.swapPlanAction(this.form)

      this.$router.replace({ name: 'account' })
    }
  },

  async mounted() {
    await this.getPlansAction()
    await this.getPlanAvailabilityAction()
  }
}
</script>
