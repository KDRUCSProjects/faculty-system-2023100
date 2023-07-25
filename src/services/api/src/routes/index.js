const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const firstuserRoute = require('./firstUser.routes');
const docsRoute = require('./docs.route');
const fileExportRoute = require('./fileExport.route');
const depratmentRoute = require('./department.route');
const config = require('../config/config');
const studentsRoutes = require('./student.routes');
const educationalYearRoutes = require('./educationalYears.routes');
const taajilRoutes = require('./taajil.routes');
const reentriesRoutes = require('./reentry.routes');
const semesterRoutes = require('./semester.routes');
const subjectRoutes = require('./subject.routes');
const shokaListRoutes = require('./shoka.list.routes');
const testRoute = require('./test.route');
const attendanceListRoutes = require('./attendance.list.routes');
const attendanceRoutes = require('./attendance.routes');
const studentListRoutes = require('./student.list.routes');
const teacherRoutes = require('./teachers.routes');
const tabdiliRoutes = require('./tabdili.routes');
const shokaRoutes = require('./shoka.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/first_users',
    route: firstuserRoute,
  },
  {
    path: '/departments',
    route: depratmentRoute,
  },
  {
    path: '/students',
    route: studentsRoutes,
  },
  {
    path: '/ExportExcel',
    route: fileExportRoute,
  },
  {
    path: '/years',
    route: educationalYearRoutes,
  },
  {
    path: '/semesters',
    route: semesterRoutes,
  },
  {
    path: '/taajils',
    route: taajilRoutes,
  },
  {
    path: '/reentries',
    route: reentriesRoutes,
  },
  {
    path: '/subjects',
    route: subjectRoutes,
  },
  {
    path: '/shokaList',
    route: shokaListRoutes,
  },
  {
    path: '/attendance',
    route: attendanceRoutes,
  },
  {
    path: '/studentList',
    route: studentListRoutes,
  },
  {
    path: '/teachers',
    route: teacherRoutes,
  },
  {
    path: '/attendanceList',
    route: attendanceListRoutes,
  },
  {
    path: '/tabdili',
    route: tabdiliRoutes,
  },
  {
    path: '/shoka',
    route: shokaRoutes,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/test',
    route: testRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// To close the routes for production, simply remove the boolean value
if (config.env === 'development' || true) {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

  // Default homepage route
  router.get('/', (req, res) => res.redirect('/docs'));
}

module.exports = router;
