const { Router } = require('express');
const {check} = require('express-validator');

const router = Router();

const {
    validateField,
    validateJWT,
    validateRol,
} = require('../middlewares');

const { getRoles, getRolesById,updateRolesById, createRoles, deleteRolesById } = require('../controllers/roles.controller');
const { rolesExistsValidate } = require('../helpers/db-validator');
const { __Crear, __Roles, __Editar, __Ver, __Eliminar } = require('../resources/var');

router.post('/', [
    validateJWT,
    validateRol(__Crear + ' ' + __Roles),
    check('name', 'El nombre no es obligatorio').not().isEmpty(),
    validateField
],createRoles);

router.get('/',[
    validateJWT,
    validateRol(__Ver + ' ' + __Roles),
    validateField
], getRoles);

router.put('/:id', [
    validateJWT,
    validateRol(__Editar + ' ' + __Roles),
    check('id').custom(rolesExistsValidate),
    validateField,
], updateRolesById);

router.get('/:id',[
    validateJWT,
    validateRol(__Ver + ' ' + __Roles),
    check('id').custom(rolesExistsValidate),
    validateField
],  getRolesById);

router.delete('/:id', [
    validateJWT,
    validateRol(__Eliminar + ' ' + __Roles),
    check('id').custom(rolesExistsValidate),
    validateField
],deleteRolesById); 

module.exports = router;