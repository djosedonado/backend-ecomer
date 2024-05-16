import { Car } from "../../models/car.js";

export const GetCars = async (req, res) => {
  try {
    const data = await Car.findAll();
    if (!data) return res.status(404).json({ message: "Car Not found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const createCars = async (req, res) => {
  const { brand, model, year, price, stock } = req.body;
  try {
    const data = await Car.create({ brand, model, year, price, stock });
    res.status(200).json({ message: "Car created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
