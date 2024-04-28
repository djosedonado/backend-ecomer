import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASSWORD_MAIL,
  },
});

const sendMail = async (email, lastname, firstname, token) => {
  try {
    const info = await transport.sendMail({
      from: ` ${process.env.USER_MAIL}`,
      to: email,
      subject: "VERIFICACION DE CUENTA", // Subject line
      text: `Please verify your email by clicking on the following link: ${process.env.HOST_URL}/verify/${token}`, // plain text body
      html: `<p>Please verify your email by clicking on the following link: <a href="${process.env.HOST_URL}/verify/${token}">Verificacion de Correo</a></p>`, // html body
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    return removeEventListener(transport, "error", error);
  }
};

export { sendMail };
