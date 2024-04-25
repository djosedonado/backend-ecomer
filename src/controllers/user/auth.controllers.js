import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createAccessToken } from "../../lib/encryp.js";
import { User } from "../../models/users.js";

dotenv.config();

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    //console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = await createAccessToken({ id: user.id });

    res.json({
      id: user.id,
      email: user.email,
      token: token,
      message: "INICIANDO SESSION",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No se proporcionó un token" });

  jwt.verify(token, process.env.SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    const userFound = await User.findByPk(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });
    return res.status(200).json({
      id: userFound.id,
      email: userFound.email,
      token: token,
      message: "Token valido",
    });
  });
};