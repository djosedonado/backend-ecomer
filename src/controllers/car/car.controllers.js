import { Car } from "../../models/car.js";
import { Article } from "../../models/article.js";

export const GetCars = async (req, res) => {
  try {
    const data = await Car.findAll();
    if (!data) return res.status(404).json({ message: "Car Not found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const AddCars = async (req, res) => {
  const { idArti, idUser } = req.body;
  try {
    const stock = Article.findByPk(idArti);
    if (!stock) return res.status(404).json({ message: "Article not found" });
    if (stock.stock <= 0) return res.status(404).json({ message: "Noy Stock" });
    const data = await Car.create({
      quantity: quantity,
      ArticleId: idArti,
      UserId: idUser,
    });
    res.status(200).json({ message: "Car created", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
