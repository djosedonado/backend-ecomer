import { User } from "../../models/users.js";
import { createAccessToken } from "../../lib/encryp.js";
import bcrypt from "bcryptjs";

export const GetUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    if (!data) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const CreateUser = async (req, res) => {
  const { lastname, firstname, email, password } = req.body;
  try {
    if (
      lastname === undefined ||
      firstname === undefined ||
      email === undefined ||
      password === undefined
    )
      return res.status(404).json({ message: "Not sending parameters" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUsers = new User({
      lastname,
      firstname,
      email,
      password: hashedPassword,
    });

    const saveUser = await newUsers.save(); //guarda en la base de datos

    const token = await createAccessToken({ id: saveUser.id });

    res.cookie("token", token);
    res.json({
      id: saveUser.id,
      email: saveUser.email,
      message: "USER SAVED",
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { lastname, firstname, email, password } = req.body;
  try {
    if (
      lastname === undefined ||
      firstname === undefined ||
      email === undefined ||
      password === undefined
    )
      return res.status(404).json({ message: "Not sending parameters" });
    const data = await User.findByPk(id);
    if (!data) return res.status(404).json({ message: "User not found" });
    data.lastname = lastname;
    data.firstname = firstname;
    data.email = email;
    data.password = password;
    await data.save();
    res.status(200).json({ message: "User Update" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === undefined)
      return res.status(304).json({ message: "Not Found Parameter" });
    const data = await User.findByPk(id);
    if (!data) return res.status(404).json({ message: "User not found" });
    await data.destroy();
    res.status(200).json({ message: "User Delete success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const GetUserId = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined)
      return res.status(300).json({ message: "Not Found Parameter" });
    const data = await User.findByPk(id);
    if (!data) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
