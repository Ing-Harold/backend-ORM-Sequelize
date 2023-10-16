'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roles_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{ model:'roles',key:'id' },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      permissions_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{ model:'permissions',key:'id' },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles_permissions');
  }
};