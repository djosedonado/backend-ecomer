import { Router } from "express";
import {
  CreateUser,
  GetUsers,
} from "../../controllers/user/user.controllers.js";
import {LoginUser} from '../../controllers/user/auth.controllers.js';

const router = Router();

router.get("/users",GetUsers);
router.post("/users", CreateUser);
router.post("/login",LoginUser);
//router.put();
//router.delete();

export default router;
