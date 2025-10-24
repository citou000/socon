import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import SignUpView from '@/views/SignUpView.vue';
import ConfirmationView from '@/views/ConfirmationView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import MentorDashboardView from '@/views/MentorView.vue';
import TeamsView from '@/views/TeamView.vue';
import { useAuth } from '@/store/auth';
import { storeToRefs } from 'pinia';

const routes = [
  { path: '/confirmation', component: ConfirmationView, meta: { public: true } },
  { path: '/signup', component: SignUpView, meta: { public: true } },
  { path: '/login', component: LoginView, meta: { public: true } },
  { path: '/not-found', component: NotFoundView, meta: { public: true } },
  { path: '/', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/mentor/dashboard', component: MentorDashboardView, meta: { requiresAuth: true } },
  { path: '/teams', component: TeamsView, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/not-found' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuth();

  const { user } = storeToRefs(auth);
  console.log('User', user.value?.user_metadata?.role);

  if (to.meta.requiresAuth && !user.value) return next('/login');
  if (to.meta.public && user.value) return next('/');
  if (to.path === '/signup' && user.value) return next('/');
  if (to.path === '/login' && user.value) return next('/');
  if (to.path === '/' && user.value?.user_metadata.role === 'admin') return next('/teams');
  if (to.path === '/' && user.value?.user_metadata.role === 'mentor')
    return next('/mentor/dashboard');
  if (to.path === '/confirmation' && !localStorage.getItem('pendingEmail'))
    return next('/not-found');
  next();
});

export default router;
