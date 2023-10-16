const { Router } = require('express');
const { getBitacoras } = require('../controllers/bitacoras.controller');
const { validateJWT, validateRol, validateField } = require('../middlewares');
const { __Ver, __Bitacoras } = require('../resources/var');
const router = Router();

router.get('/', [
    validateJWT,
    validateRol(__Ver + ' ' + __Bitacoras),
    validateField,
], getBitacoras);

module.exports = router;