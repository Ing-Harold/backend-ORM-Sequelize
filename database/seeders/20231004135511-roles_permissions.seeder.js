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
    const roles1 = await models.roles.create({
      name: 'Administrador',
    });
    const roles2 = await models.roles.create({
      name: 'Decano',
    });
    const roles3 = await models.roles.create({
      name: 'Vicedecano',
    });
    const roles4 = await models.roles.create({
      name: 'Director Sistemas',
    });

    const permissions1 = await models.permissions.create({
      name: 'Crear Roles',
    });

    const permissions2 = await models.permissions.create({
      name: 'Ver Roles',
    });

    const permissions3 = await models.permissions.create({
      name: 'Editar Roles',
    });

    const permissions4 = await models.permissions.create({
      name: 'Eliminar Roles',
    });

    const permissions5 = await models.permissions.create({
      name: 'Asignar Roles y Permisos',
    });

    const permissions6 = await models.permissions.create({
      name: 'Ver Bitacoras',
    });

    const permissions7 = await models.permissions.create({
      name: 'Ver Permisos',
    });

    const permissions8 = await models.permissions.create({
      name: 'Ver Administrativos',
    });

    const permissions9 = await models.permissions.create({
      name: 'Crear Administrativos',
    });

    const permissions10 = await models.permissions.create({
      name: 'Editar Administrativos',
    });
    const permissions11 = await models.permissions.create({
      name: 'Eliminar Administrativos',
    });

    const permissions12 = await models.permissions.create({
      name: 'Asignar Permisos',
    });

    const permissions13 = await models.permissions.create({
      name: 'Designar Permisos',
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions1.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions2.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions3.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions4.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions5.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions6.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions7.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions8.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions9.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions10.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions11.id,
    });

    await models.roles_permissions.create({
      roles_id: roles1.id,
      permissions_id: permissions12.id,
    });

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
      roles_id: roles1.id
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
      roles_id: roles2.id
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
      roles_id: roles3.id
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('roles_permissions', null, {});
  }
};
