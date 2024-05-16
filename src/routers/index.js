import express from 'express';
import routerUser from './user/user.routers.js';
import routerArticle from './article/article.routers.js';
import routerCar from './car/car.routers.js';

const router = express.Router();

router.use(routerUser);
router.use(routerArticle);
router.use(routerCar);

export default router;