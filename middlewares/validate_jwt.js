const jwt = require('jsonwebtoken');
const models = require('../database/models/index');
const { _getAdministrativeRolesByAdministrative_Id } = require('../controllers/roles_permissions.controller');

const validateJWT = async(req, res, next)=>{
    const token = req.header('token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log(uid);
        req.user_id = uid;
        console.log(req.user_id + "id del admin")
        const rolID = await models.administratives.findByPk(uid);
        req.rol_id = rolID.roles_id;
        next();
    } catch(error) {
        res.status(401).json({
            msg: 'Token no valido ' + error
        });
    }
}

module.exports = {
    validateJWT
}