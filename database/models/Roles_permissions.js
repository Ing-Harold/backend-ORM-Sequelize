'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolesPermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.permissions,{foreignKey:'permissions_id', as :'permissions'})
      this.belongsTo(models.roles,{foreignKey:'roles_id', as :'roles'})
    }
  }
  RolesPermissions.init({
  }, {
    sequelize,
    modelName: 'roles_permissions',
  });
  return RolesPermissions;
};