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
    // We will redirect the user to /dashboard once it's ready.
    path: '/',
    redirect: '/teachers',
  },
  {
    path: '/teachers',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/teachers/TeachersList.vue'),
  },
  {
    path: '/settings',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Settings.vue'),
  },
  {
    path: '/auth',
    component: () => import('@/views/auth/TheLogin.vue'),
    meta: {
      requiresUnauth: true,
    },
  },
  {
    path: '/students',
    component: () => import('@/views/students/Students.vue'),
    children: [
      {
        path: 'all',
        name: 'students-list',
        component: () => import('@/views/students/StudentsTable.vue'),
      },
      {
        path: 'new',
        name: 'register-student',
        component: () => import('@/views/students/StudentRegistration.vue'),
      },
      {
        path: 'view/:id',
        name: 'view-student',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/students/StudentViewProfile.vue'),
        props: true,
      },
    ],
  },
  // {
  //   path: '/student/:id',
  //   component: () => import('@/views/students/Student.vue'),
  //   meta: {
  //     requiresAuth: true,
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'view-student',
  //       component: () => import('@/components/students/ViewProfile.vue'),
  //       props: true,
  //     },
  //   ],
  // },
  {
    path: '/subjects',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/subjects/SubjectsList.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth',
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
