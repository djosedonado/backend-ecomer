import Sequelize from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

export const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER_DB,
    process.env.PASSWORD,
    {
        host: process.env.HOST_DB,
        dialect: process.env.TYPE_DATABASE,
        port: process.env.PORT_DATABASE
    }
);