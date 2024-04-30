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
      subject: "VERIFICACION DE CUENTA",
      html: `<head>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              text-align: center;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              display: flex; /* Usa flexbox */
              flex-direction: column; /* Alinea los elementos verticalmente */
              align-items: center; /* Centra los elementos horizontalmente */
          }
  
          h1 {
              color: #333;
          }
  
          .icon img {
              width: 100px; /* Tamaño de la imagen */
              height: auto;
          }
  
          .button {
              display: inline-block;
              background-color: #28a745; /* Color verde */
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="icon">
              <img src="https://static.doofinder.com/main-files/uploads/2018/05/Queson.png" alt="Verification Image">
          </div>
          <div>
            <h1>CORREO VERIFICADO</h1>
            <p>${lastname} ${firstname}</p>
            <p>CONFIRME SU CUENTA POR FAVOR</p>
          </div>
          <div>
            <a href="${process.env.HOST_URL}/verifyEmail/${token}" class="button">Confirmar</a>
          </div>
      </div>
  </body>`,
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    return removeEventListener(transport, "error", error);
  }
};

export { sendMail };
