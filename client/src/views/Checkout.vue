<template>
  <form @submit.prevent="submit">
    <div class="mb-6">
      <label for="name" class="inline-block text-sm mb-2">Your name</label>
      <input type="text" id="name" v-model="form.name" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md">
    </div>

    <div class="mb-6">
      <label for="card" class="inline-block text-sm mb-2">Card details</label>
      <div id="id" ref="card"></div>
    </div>

    <button type="submit" class="bg-indigo-500 text-white px-4 py-3 leading-none rounded-lg font-medium">
      Pay
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'


const stripe = Stripe(process.env.VUE_APP_STRIPE_KEY)
const elements = stripe.elements()
const cardElement = elements.create('card')

export default {
  name: 'Checkout',

  props: {
    plan: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      form: {
        name: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      paymentIntentSecret: 'stripe/paymentIntentSecret'
    })
  },

  methods: {
    ...mapActions({
      getPaymentIntentSecretAction: 'stripe/getPaymentIntentSecret',
      createSubscriptionAction: 'stripe/createSubscription',
    }),

    async submit() {
      const { setupIntent, error } = await stripe.confirmCardSetup(this.paymentIntentSecret.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: this.form.name }
        }
      })

      if(error) {
        //
      } else {
        await this.createSubscriptionAction({ 
          plan: this.plan,
          token: setupIntent.payment_method
        })

        this.$router.replace({ name: 'account' })
      }
    }
  },

  async mounted() {
    cardElement.mount(this.$refs.card)

    await this.getPaymentIntentSecretAction()
  }
}
</script>
