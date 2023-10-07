// Composables
import { createRouter, createWebHistory } from 'vue-router';

import store from '@/store';

// This happens before the app mount
store.dispatch('tryLogin');

let redirectPath = '/dashboard';

switch (store.getters.role) {
  case 'user':
    redirectPath = '/home';
    break;
  case 'teachingManager':
    redirectPath = '/students/all';
    break;
  case 'execManager':
    redirectPath = '/students-status-change';
    break;
}

console.log(redirectPath);

const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/home',
    component: () => import('@/views/teachers/ViewAccount.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/',
    redirect: redirectPath,
  },
  {
    path: '/teachers',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/teachers/Teachers.vue'),
    children: [
      {
        path: '',
        name: 'all-teachers',
        component: () => import('@/views/teachers/TeachersList.vue'),
      },
      {
        path: 'view/:id',
        name: 'view-teacher',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/teachers/ViewTeacher.vue'),
        props: true,
      },
    ],
  },
  // {
  //   path: '/departments',
  //   component: () => import('@/views/departments/departmentList.vue'),
  //   // component: () => import('@/views/setupWizard/setupWizard.vue')
  // },
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
        path: 'status-change',
        name: 'status-change',
        component: () => import('@/views/students/StudentStatusChange.vue'),
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
    component: () => import('@/views/subjects/Subject.vue'),
    children: [
      {
        path: 'shoka/:subjectId',
        name: 'view-shoka',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/subjects/shoka/ViewUpdateShoka.vue'),
        props: true,
      },
      {
        path: 'attendance/:subjectId',
        name: 'view-attendance',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/subjects/attendance/ViewUpdateAttendance.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/semesters',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/semesters/Semesters.vue'),
    children: [
      {
        path: 'all',
        name: 'semesters-list',
        component: () => import('@/views/semesters/SemestersList.vue'),
      },
      {
        path: 'view/:id',
        name: 'view-semester',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/semesters/SemesterView.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/periods',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/periods/Periods.vue'),
    children: [
      {
        path: '',
        name: 'periods-list',
        component: () => import('@/views/periods/PeriodsList.vue'),
      },
      {
        path: 'view/:id',
        name: 'view-period',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/periods/PeriodView.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/report',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/views/Report.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    // Check user role
    if (store.getters.isTeacher) {
      return next('/home');
    }
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
