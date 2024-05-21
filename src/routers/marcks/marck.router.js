import { Router } from "express";
import {
  AddTradeMark,
  GetTradeMark,
  GetTradeMarks,
  UpdateTradeMark,
} from "../../controllers/marcks/marck.controller.js";

const router = Router();

router.post("/marcks", AddTradeMark);
router.get("/marcks", GetTradeMarks);
router.post("/marcks/:id", GetTradeMark);
router.put("/marcks/:id", UpdateTradeMark);

export default router;
