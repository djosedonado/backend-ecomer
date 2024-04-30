import { Router } from "express";
import {
  CreateUser,
  GetUsers,
  UpdateUser,
  DeleteUser,
  GetUserId,
  verifyEmail,
} from "../../controllers/user/user.controllers.js";
import {
  LoginUser,
  verifyToken,
} from "../../controllers/user/auth.controllers.js";
import { AuthToken } from "../../middleware/index.js";

const router = Router();

router.get("/verifyEmail/:token", verifyEmail);
router.get("/verify/status",AuthToken, verifyToken);
router.get("/users", AuthToken, GetUsers);
router.post("/users", CreateUser);
router.post("/login", LoginUser);
router.put("/users/:id", AuthToken, UpdateUser);
router.delete("/users/:id", AuthToken, DeleteUser);
router.post("/users/:id", AuthToken, GetUserId);


export default router;
