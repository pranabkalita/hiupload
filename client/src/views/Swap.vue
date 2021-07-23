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

    <c-button v-if="availablePlans.length" title="Swap" type="submit" :disabled="loading || !form.plan" :loading="loading" />

    <p v-else class="text-gray-800 text-sm">There are no available plans for you to swap right now, because you're using too much storage.</p>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import cPlan from '@/components/cPlan'
import cButton from '@/components/cButton'

export default {
  name: 'Swap',

  components: {
    cPlan,
    cButton
  },

  data() {
    return {
      form: {
        plan: null
      },
      loading: false,
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
    },

    chosenPlan() {
      return this.plans.find(p => p.slug === this.form.plan)
    }
  },

  methods: {
    ...mapActions({
      getPlansAction: 'plans/getPlans',
      swapPlanAction: 'plans/swapPlan',
      getPlanAvailabilityAction: 'plans/getPlanAvailability',
      snack: 'snack/snack',
    }),

    canSwapToPlan(plan) {
      return this.availablePlans.find(p => p.slug === plan.slug)
    },

    async swap() {
      this.loading = true
      await this.swapPlanAction(this.form)
      this.loading = false

      this.snack(`You have swapped to the ${this.chosenPlan.name} plan.`)
      this.$router.replace({ name: 'account' })
    }
  },

  async mounted() {
    await this.getPlansAction()
    await this.getPlanAvailabilityAction()
  }
}
</script>
