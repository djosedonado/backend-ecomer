import express from "express";
import routerUser from "./user/user.routers.js";
import routerArticle from "./article/article.routers.js";
import routerCar from "./car/car.routers.js";
import routerMarcks from "./marcks/marck.router.js";
import routerCategoty from "../routers/category/category.router.js";

const router = express.Router();
router.use(routerMarcks);
router.use(routerUser);
router.use(routerCategoty);
router.use(routerArticle);
router.use(routerCar);

export default router;
