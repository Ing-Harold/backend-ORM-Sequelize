const { Router } = require('express');
const {check} = require('express-validator');

const router = Router();

const {
    validateField,
    validateJWT,
    validateRol,
} = require('../middlewares');

const {
    assignPermissionsToRol,
    deletePermissionsToRol,
    getPermissionsFromRol
} = require('../controllers/roles_permissions.controller');

const { rolesExistsValidate} = require('../helpers/db-validator');
const { __Asignar, __Permisos, __Ver, __Designar } = require('../resources/var');

router.post('/:id', [
    validateJWT,
    validateRol(__Asignar + ' ' + __Permisos),
    check('id').custom(rolesExistsValidate),
    validateField
],assignPermissionsToRol);

router.get('/:id',[
    validateJWT,
    validateRol(__Ver + ' ' + __Permisos),
    check('id').custom(rolesExistsValidate),
    validateField
], getPermissionsFromRol);

router.delete('/:id',[
    validateJWT,
    validateRol(__Designar + ' ' + __Permisos),
    check('id').custom(rolesExistsValidate),
    validateField
], deletePermissionsToRol);

module.exports = router;