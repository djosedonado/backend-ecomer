import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const AuthToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (!authHeader) {
      return res.status(401).json({ message: "No hay token, autorización denegada" });
    }

    if (!token) {
      return res.status(401).json({ message: "Token no válido, autorización denegada" });
    }
    // Verificación del token
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token inválido" });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
