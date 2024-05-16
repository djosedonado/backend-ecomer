import { sequelize } from "../database/index.js";
import { DataTypes, TableHints } from "sequelize";
import { TradeMark } from "./tradeMark.js";
import { Category } from "./category.js";

export const Article = sequelize.define("Article", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
  },
});

//Relacion de Categoria a Article

Category.hasMany(Article);

Article.belongsTo(Category);


// Relacion entre Articulos y Marca


TradeMark.hasMany(Article);

Article.belongsTo(TradeMark);


// 