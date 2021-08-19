'use strict';
require('dotenv').config();
const userModel = require('./users');
const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/model');
const foodModel = require('./food/model');
const Collection = require('./data-collection');

// const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const DATABASE_URL = process.env.NODE_ENV='test'?'sqlite:memory:':
'postgres://localhost:5432/lab08'

const sequelize = new Sequelize(DATABASE_URL,{});


const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);




module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes)
};
