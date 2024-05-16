import { GetCars } from "../../controllers/car/car.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/cars", GetCars);

export default router;
