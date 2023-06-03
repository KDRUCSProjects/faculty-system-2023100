// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/auth',
    component: () => import('@/views/auth/TheLogin.vue'),
    meta: {
      requiresUnauth: true,
    },
  },
  {
    path: '/test',
    component: () => import('@/views/TestPage.vue'),
  },
];

import store from '@/store';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// This happens before the app mount
store.dispatch('tryLogin');

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
