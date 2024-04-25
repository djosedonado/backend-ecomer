import {sequelize} from '../database/index.js';
import {DataTypes} from 'sequelize';

export const Article = sequelize.define('Article',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    stock: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    }
});