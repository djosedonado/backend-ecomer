import { DataTypes } from 'sequelize';
import { sequelize } from "../database/index.js";


export const User = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lastname: {
        type: DataTypes.STRING
    },
    firstname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    isVerified:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    rol:{
        type: DataTypes.STRING,
        defaultValue: "user",
    }
});
