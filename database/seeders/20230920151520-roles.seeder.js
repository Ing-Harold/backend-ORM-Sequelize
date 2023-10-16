'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //return await createAdm(queryInterface);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('roles', null, {});
  }
};

async function createAdm(queryInterface) {
  return await queryInterface.bulkInsert('roles', [
    {
      name: 'Administrador',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Decano',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Vicedecano',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Director Sistemas',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
}

