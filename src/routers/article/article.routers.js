import {
  CreateArticle,
  GetArticles,
  DeleteArticle,
  UpdateArticle,
  getArticleId,
} from "../../controllers/article/article.controllers.js";
import { GetImages } from "../../controllers/image/image.controller.js";
import { upload } from "../../middleware/index.js";
import { Router } from "express";

const router = Router();

router.get("/articles", GetArticles);
router.post("/articles", upload, CreateArticle);
router.put("/articles/:id", upload, UpdateArticle);
router.delete("/articles/:id", DeleteArticle);
router.post("/articles/:id", getArticleId);
router.get("/img/:container/:filename", GetImages);

export default router;
