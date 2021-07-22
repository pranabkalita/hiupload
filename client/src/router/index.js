import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Upload from '../views/Upload.vue'
import Plans from '../views/Plans.vue'
import Checkout from '../views/Checkout.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/uploads', name: 'uploads', component: Upload },
  { path: '/plans', name: 'plans', component: Plans },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
    props: (route) => ({ plan: route.query.plan }),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
