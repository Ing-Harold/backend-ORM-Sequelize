const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // db name,
  process.env.DB_USERNAME, // username
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
    // pool: {
    //   max: 5,
    //   min: 0,
    //   require: 30000,
    //   idle: 10000,
    // },
    // logging: false,
  }
);

module.exports = {
    sequelize
}