import { TradeMark } from "../../models/tradeMark.js";

export const GetTradeMarks = async (req, res) => {
  try {
    const data = await TradeMark.findAll();
    if (data.length <= 0)
      return res.status(404).json({ message: "TradeMark not found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const AddTradeMark = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await TradeMark.create({ name: name });
    if (data.length === 0)
      return res.status(404).json({ message: "Not Found" });
    res.status(200).json({ message: "TradeMark created", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const GetTradeMark = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TradeMark.findByPk(id);
    if (!data) return res.status(404).json({ message: "TradeMark not found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdateTradeMark = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const data = await TradeMark.findByPk(id);
    if (data.length <= 0)
      return res.status(404).json({ message: "TradeMark not found" });
    data.name = name;
    await data.save();
    res.status(200).json({ message: "TradeMark Update" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeleteTradeMark = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TradeMark.findByPk(id);
    if (data.length <= 0)
      return res.status(404).json({ message: "TradeMark not found" });
    await data.destroy();
    res.status(200).json({ message: "TradeMark Delete" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
