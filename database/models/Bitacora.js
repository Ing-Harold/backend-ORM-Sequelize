'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bitacora extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bitacora.init({
    action: DataTypes.STRING,
    table_type: DataTypes.STRING,
    event: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    values: DataTypes.JSON,

  }, {
    sequelize,
    modelName: 'bitacoras',
  });
  return Bitacora;
};