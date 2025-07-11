import express from 'express';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import blogRoute from './blog.route.js';
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
   {
    path: '/blogs', 
    route: blogRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
