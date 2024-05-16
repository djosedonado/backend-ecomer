import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";



export const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
});
