import { GetCars, AddCars } from "../../controllers/car/car.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/cars", GetCars);
router.post("/cars", AddCars);

export default router;
