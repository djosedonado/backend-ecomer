import { Category } from "../../models/category.js";

export const GetCategories = async (req, res) => {
  try {
    const data = await Category.findAll();
    if (!data) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



