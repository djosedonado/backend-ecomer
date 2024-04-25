import express from 'express';
import routerUser from './user/user.routers.js';
import routerArticle from './article/article.routers.js';

const router = express.Router();

router.use(routerUser);
router.use(routerArticle);

export default router;