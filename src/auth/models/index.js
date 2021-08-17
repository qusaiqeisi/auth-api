'use strict';


const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL='postgres://localhost:5432/qusaiqeisi'
const clothesModel = require('./clothes/model');
const foodModel = require('./food/model');
const userModel = require('./users')
const Collection = require('./data-collection');


const sequelize = new Sequelize(DATABASE_URL);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes),
};






