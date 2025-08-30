import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import SignUpView from '@/views/SignUpView.vue';
import { useAuth } from '@/store/auth';

const routes = [
  { path: '/login', component: SignUpView },
  { path: '/signup', component: LoginView },
  { path: '/', component: DashboardView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { user } = useAuth();
  if (to.meta.requiresAuth && !user.value) return next('/login');
  if (to.path === '/login' && user.value) return next('/');
  next();
});

export default router;
