import {
  CreateArticle,
  GetArticles,
  DeleteArticle,
  UpdateArticle,
  getArticleId
} from "../../controllers/article/article.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/articles", GetArticles);
router.post("/articles", CreateArticle);
router.put("/articles/:id", UpdateArticle);
router.delete("/articles/:id",DeleteArticle);
router.post("/articles/:id", getArticleId);

export default router;
