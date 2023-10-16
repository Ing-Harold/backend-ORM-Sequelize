'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    //return await createPermissions(queryInterface);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('permissions', null, {});
  }
};
async function createPermissions(queryInterface) {
  return await queryInterface.bulkInsert('permissions', [
    {
      name: 'Crear Roles',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ver Roles',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Editar Roles',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Eliminar Roles',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Asignar Roles y Permisos',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ver Bitacoras',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
}

