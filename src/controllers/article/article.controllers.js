import { Article } from "../../models/article.js";
import { config } from "dotenv";
import { blobServiceClient } from "../../database/azure/storage.database.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";

config();

export const GetArticles = async (req, res) => {
  try {
    const data = await Article.findAll();
    if (data.length <= 0)
      return res.status(404).json({ message: "Article not found" });
    const datos = [];
    data.map((item) => {
      datos.push({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        image: `${process.env.HOST_BACKEND}images/${item.image}`,
        category: item.categoryId,
        TradeMarck: item.TradeMarckId,
      });
    });
    res.status(200).json({ datos });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const CreateArticle = async (req, res) => {
  const { name, description, price, stock, idCategory, idMarks, container } =
    req.body;
  const image = req.file;
  if (!image) return res.status(400).json({ message: "NOT FOUND FILE" });
  try {
    const { buffer, mimetype } = image;
    const extension = path.extname(image.originalname);
    const newFileName = `${uuidv4()}${extension}`;
    const containerClient = blobServiceClient.getContainerClient(container);
    await containerClient.getBlockBlobClient(newFileName).uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: mimetype },
    });
    console.log(image);

    if (
      name === undefined ||
      description === undefined ||
      image === undefined ||
      price === undefined ||
      stock === undefined ||
      idCategory === undefined ||
      idMarks === undefined
    )
      return res.status(404).json({ message: "not send parameter" });
    const saveArticle = await Article.create({
      name,
      description,
      image: `${newFileName}`,
      price,
      stock,
      categoryId: idCategory,
      TradeMarckId: idMarks,
    });
    res.status(200).json({ message: "success", saveArticle });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const UpdateArticle = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category } = req.body;
  const image = req.file;
  try {
    if (id === undefined)
      return res.status(404).json({ message: "not found id Parameter" });
    if (
      name === undefined ||
      description === undefined ||
      image === undefined ||
      price === undefined ||
      stock === undefined ||
      category === undefined
    )
      return res.status(404).json({ message: "not found Parameter" });
    const data = await Article.findByPk(id);
    if (!data) return res.status(404).json({ message: "Article not found" });
    data.name = name;
    data.description = description;
    data.image = image ? `/uploads/img/${image.filename}` : null;
    data.price = price;
    data.stock = stock;
    data.category = category;
    await data.save();
    res.status(200).json({ message: "Article Update" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const DeleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === undefined)
      return res.status(404).json({ message: "Not Found id parameter" });
    const data = await Article.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not Found" });
    await data.destroy();
    res.status(200).json({ message: "Article Deleted" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const getArticleId = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === undefined || id === null)
      return res.status(404).json({ message: "Not Found id parameter" });
    const data = await Article.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not Found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
