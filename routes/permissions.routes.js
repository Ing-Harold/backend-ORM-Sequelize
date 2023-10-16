const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
    validateField,
    validateJWT,
    validateRol,
} = require('../middlewares');
const { getPermissions } = require('../controllers/permissions.controller.');
const { __Ver, __Permisos } = require('../resources/var');


router.get('/', [
    validateJWT,
    validateRol(__Ver + ' ' + __Permisos),
    validateField
],getPermissions);

module.exports = router;