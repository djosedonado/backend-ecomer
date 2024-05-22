import Sequelize from "sequelize";
import { config } from "dotenv";

config();

export const sequelize = new Sequelize(process.env.CONNECT, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Para evitar errores de certificado en entornos de desarrollo, elimina esta línea en producción
    },
  },
});

export const _sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER_DB,
  process.env.PASSWORD,
  {
    host: process.env.HOST_DB,
    dialect: process.env.TYPE_DATABASE,
    port: process.env.PORT_DATABASE,
  }
);
