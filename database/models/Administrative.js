'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administrative extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.persons,{foreignKey:'persons_id', as :'persons'});
      this.belongsTo(models.roles,{foreignKey:'roles_id', as :'roles'});
    }
  }
  Administrative.init({
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path_image: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'administratives',
  });
  return Administrative;
};