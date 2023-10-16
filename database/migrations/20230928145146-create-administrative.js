'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('administratives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // Atributos específicos de Administrative
      persons_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'persons', // Nombre de la tabla padre
          key: 'id', // Clave primaria de la tabla padre
        },
        allowNull: false,
      },
      roles_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles', // Nombre de la tabla padre
          key: 'id', // Clave primaria de la tabla padre
        },
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      path_image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('administratives', {
      fields: ['persons_id'],
      type: 'foreign key',
      name: 'fk_administratives_persons_id', 
      references: {
        table: 'persons',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('administratives', {
      fields: ['roles_id'],
      type: 'foreign key',
      name: 'fk_administratives_roles_id', 
      references: {
        table: 'roles',
        field: 'id',
      },
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    //await queryInterface.removeConstraint('administratives', 'fk_administratives_persons_id');
    //await queryInterface.removeConstraint('administratives', 'fk_administratives_roles_id');
    await queryInterface.dropTable('administratives');
  }
};
