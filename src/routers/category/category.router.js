import {
  AddCategory,
  DeleteCategory,
  GetCategories,
  UpdateCategory,
} from "../../controllers/category/category.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/categories", GetCategories);

router.post("/categories", AddCategory);

router.put("/categories/:id", UpdateCategory);

router.delete("/categories/:id", DeleteCategory);

export default router;
