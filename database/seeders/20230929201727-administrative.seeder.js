'use strict';
const models = require("../models/index");

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
    //await createAdministrative();

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('administratives', null, {});
    return queryInterface.bulkDelete('persons', null, {});
  }
};

async function createAdministrative() {
  const person1 = await models.persons.create({
    ci: '',
    email: 'admin@ficct.uagrm.edu.bo',
    name: 'AdminFFICCT',
    sexo: null,
    telephone: '71190290',
  });

  await models.administratives.create({
    password: '$2a$10$HEuviX6aimb2wJ9WQJ8cre4cD5vE2CWZhB1dSUey2qVkCqx8ShiKC',
    path_image: null,
    persons_id: person1.id,
    roles_id: 1
  });

  const person2 = await models.persons.create({
    ci: '',
    email: 'harold@ficct.uagrm.edu.bo',
    name: 'Harold',
    sexo: null,
    telephone: '71190290',
  });

  await models.administratives.create({
    password: '$2a$10$$2a$10$sDy2je7RdDqHi9jzRjZLSOUEY6Vrc8ZpoGd2ptuVnIdZoVnAvyMrW',
    path_image: null,
    persons_id: person2.id,
    roles_id: 2
  });

  const person3 = await models.persons.create({
    ci: '',
    email: 'melanie@ficct.uagrm.edu.bo',
    name: 'Melanie',
    sexo: null,
    telephone: '71190290',
  });

  await models.administratives.create({
    password: '$2a$10$$2a$10$sDy2je7RdDqHi9jzRjZLSOUEY6Vrc8ZpoGd2ptuVnIdZoVnAvyMrW',
    path_image: null,
    persons_id: person3.id,
    roles_id: 3
  });
}

