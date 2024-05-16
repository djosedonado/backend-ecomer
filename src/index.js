import app from './app.js';
import { sequelize } from "./database/index.js";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  try {
    await sequelize.sync({/*forze: true*/alert: true});
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error de conexion en la base de datos  ", error);
  }
}

main();
