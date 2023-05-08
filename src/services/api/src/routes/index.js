const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const depratmentRoute = require('./department.route');
const config = require('../config/config');

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
    path: '/departments',
    route: depratmentRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
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
