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
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUsers = new User({
      lastname,
      firstname,
      email,
      password:hashedPassword
    });

    const saveUser = await newUsers.save(); //guarda en la base de datos

    const token = await createAccessToken({ id: saveUser.id });

    res.cookie("token", token);
    res.json({
      id: saveUser.id,
      email: saveUser.email,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
