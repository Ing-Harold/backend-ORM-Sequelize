'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.administratives,{foreignKey:'persons_id', as :'administratives'});
    }
  }
  Person.init({
    ci: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING
    },
    estado: {
      type: DataTypes.BOOLEAN
    },
    sexo: {
      type: DataTypes.STRING(1)
    },
    telephone: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'persons',
  });
  return Person;
};