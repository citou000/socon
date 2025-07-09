import { createRouter, createWebHistory } from 'vue-router'
// import DashboardView from '@/views/DashboardView.vue'
// import LoginView from '@/views/LoginView.vue'
import SignUp from '@/views/SignUpView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView,
    },
    {
      path: '/SignUp',
      name: 'signup',
      component: SignUp,
    },
  ],
})

export default router
