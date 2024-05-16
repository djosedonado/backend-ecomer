import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";


export const TradeMark = sequelize.define("TradeMarck", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
})

