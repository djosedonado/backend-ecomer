import { Router } from "express";
import {
  CreateUser,
  GetUsers,
  UpdateUser,
  DeleteUser,
  GetUserId,
  verifyEmail
} from "../../controllers/user/user.controllers.js";
import { LoginUser } from "../../controllers/user/auth.controllers.js";
import { AuthToken } from "../../middleware/index.js";

const router = Router();

router.get("/verify/:token",verifyEmail);
router.get("/users", GetUsers);
router.post("/users", CreateUser);
router.post("/login", LoginUser);
router.put("/users/:id", UpdateUser);
router.delete("/users/:id", DeleteUser);
router.post("/users/:id", GetUserId);

export default router;
