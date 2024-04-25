import { Article } from "../../models/article.js";

export const GetArticles = async (req, res) => {
  try {
    const data = await Article.findAll();
    console.log(data);
    if (!data) return res.status(404).json({ message: "Article not found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const CreateArticle = async (req, res) => {
  const { name, description, image, price, stock, category } = req.body;
  try {
    if (
      name === undefined ||
      description === undefined ||
      image === undefined ||
      price === undefined ||
      stock === undefined ||
      category === undefined
    )
      return res.status(404).json({ message: "not send parameter" });
    const saveArticle = await Article.create({
      name,
      description,
      image,
      price,
      stock,
      category,
    });
    res.json({
      id: saveArticle.id,
      name: saveArticle.name,
      description: saveArticle.description,
      image: saveArticle.image,
      price: saveArticle.price,
      stock: saveArticle.stock,
      category: saveArticle.category,
      message: "ARTICLE SAVED",
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const UpdateArticle = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, price, stock, category } = req.body;
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
    data.image = image;
    data.price = price;
    data.stock = stock;
    data.category = category;
    await data.save();
    res.status(200).json({ message: "Article Update"});
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
