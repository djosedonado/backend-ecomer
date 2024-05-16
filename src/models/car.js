import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { User } from "./users.js";
import { Article } from "./article.js";

export const Car = sequelize.define("Car", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

// Relacion entre la Carrito y el Articulo

Article.hasMany(Car);

Car.belongsTo(Article);


// Relacion entre la Carrito y el Usuairo


User.hasOne(Car);

Car.belongsTo(User);

