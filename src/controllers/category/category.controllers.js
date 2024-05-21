import { Category } from "../../models/category.js";

export const GetCategories = async (req, res) => {
  try {
    const data = await Category.findAll();
    if (data.length <= 0) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const AddCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await Category.create({ name });
    res.status(200).json({ message: "Category created", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const data = await Category.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not Found" });
    const update = await data.update({ name });
    res.status(200).json({ message: "Category updated", update });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Category.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not Found" });
    await data.destroy();
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}