import express from 'express';
import routerUser from './user/user.routers.js';


const router = express.Router();

router.use(routerUser);

export default router;