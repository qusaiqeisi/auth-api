'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL=process.env.DATABASE_URL
const clothesModel = require('./clothes/model');
const foodModel = require('./food/model');
const userModel = require('./users')
const Collection = require('./data-collection');
let sequelizeOptions = {
  dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
};
let sequelize = new Sequelize(POSTGRES_URI,sequelizeOptions);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes),
};






