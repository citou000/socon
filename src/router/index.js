import { createRouter, createWebHistory } from 'vue-router';
import { watch } from 'vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import SignUpView from '@/views/SignUpView.vue';
import TeamView from '@/views/TeamView.vue';
import ConfirmationView from '@/views/ConfirmationView.vue';
import { useAuth } from '@/store/auth';
import { storeToRefs } from 'pinia';

const routes = [
  { path: '/confirmation', component: ConfirmationView },
  { path: '/signup', component: SignUpView },
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: TeamView, meta: { requiresAuth: true } },
  { path: '/', component: DashboardView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuth();
  const { user, initialized } = storeToRefs(auth);

  if (!initialized.value) {
    await auth.init();
  }

  if (to.meta.requiresAuth && !user.value) return next('/login');
  if (to.path === '/signup' && user.value) return next('/team');
  if (to.path === '/login' && user.value) return next('/team');
  next();
});

export default router;
