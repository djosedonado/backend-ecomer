import {
  CreateArticle,
  GetArticles,
  DeleteArticle,
  UpdateArticle,
  getArticleId,
} from "../../controllers/article/article.controllers.js";
import { upload, AuthToken } from "../../middleware/index.js";
import { Router } from "express";

const router = Router();

router.get("/articles", AuthToken, GetArticles);
router.post("/articles", upload, CreateArticle);
router.put("/articles/:id", upload, UpdateArticle);
router.delete("/articles/:id", DeleteArticle);
router.post("/articles/:id", getArticleId);

export default router;
