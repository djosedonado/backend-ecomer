import { User } from "../../models/users.js";
import { createAccessToken, generateToken } from "../../lib/encryp.js";
import { sendMail } from "../../middleware/index.js";
import { verifyVerificationToken } from "./auth.controllers.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

// Confirmación de correo electrónico
export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = verifyVerificationToken(token);
    //console.log(userId);
    const user = await User.findByPk(userId);
    //console.log(user)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isVerified = true;
    await user.save();
    res.render("verify", { message: "Email verified. You can now login." });
  } catch (error) {
    //console.error("Error verifying email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verificationMail = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    if (email === undefined)
      return res.status(401).json({ error: "email is required" });
    const userFound = await User.findOne({ where: { email } });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    if (userFound.isVerified) {
      return res.status(401).json({ error: "el correo ya esta verificado" });
    }
    const token = await generateToken({ id: userFound.id });
    sendMail(userFound.email, userFound.lastname, userFound.firstname, token);
    console.log(userFound);
    const user = {
      id: userFound.id,
      email: userFound.email,
      token: token,
    };
    res.status(200).json({ message: "success", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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

    const exUser = await User.findOne({ email: email });
    if (exUser) return res.status(404).json({ message: "Usuario ya Existe" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUsers = new User({
      lastname: lastname,
      firstname: firstname,
      email,
      password: hashedPassword,
    });

    const saveUser = await newUsers.save(); //guarda en la base de datos

    const token = await createAccessToken({ id: saveUser.id });
    //envia el correo
    sendMail(email, lastname, firstname, token);
    const data = {
      id: saveUser.id,
      lastname: saveUser.lastname,
      firstname: saveUser.firstname,
      email: saveUser.email,
      rol: saveUser.rol,
    };
    console.log(data);
    //res.cookie("token", token);
    res.status(200).json({
      data,
      message: "USUARIO CREADO VERIFIQUE SU CORREO",
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { lastname, firstname, email, password } = req.body;
  const image = req.file;
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
    data.foto = image ? `/uploads/img/${image.filename}` : null;
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
