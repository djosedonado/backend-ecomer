import { Router } from "express";
import {
  CreateUser,
  GetUsers,
  UpdateUser,
  DeleteUser,
  GetUserId,
  verifyEmail,
  verificationMail,
} from "../../controllers/user/user.controllers.js";
import {
  LoginUser,
  verifyToken,
} from "../../controllers/user/auth.controllers.js";
import { AuthToken, limiter } from "../../middleware/index.js";

const router = Router();

router.get("/verifyEmail/:token", verifyEmail); //VERIFICA EL CORREO ENVIANDOLO A UNA PAGINA DE VERIFICACION
router.post("/verifyMail/:email", limiter, verificationMail); // ENVIA UN CORREO SI NO LE LLEGO AL USUARIO
router.get("/verify/status",verifyToken); // VERIFICA EL ESTADO DEL TOKEN 
router.get("/users", AuthToken, GetUsers); // TRAE TODO LOS USUARIOS REGISTRADO EN EL BACKEND
router.post("/users", CreateUser); // CREA LOS USUARIOS
router.post("/login", LoginUser);// ESTE ES EL LOGIN
router.put("/users/:id", AuthToken, UpdateUser); // ESTE MODIFICA ALGUNOS DATOS DEL USUARIO
router.delete("/users/:id", AuthToken, DeleteUser); // ELIMINA LOS USUARIOS POR MEDIO DE LA ID
router.post("/users/:id", AuthToken, GetUserId);// LLAMA A LOS USUARIOS PO MEDIO DE LA ID
router.put("/users/:email"); // CAMBIAR LA CONTRASEÑA

export default router;
