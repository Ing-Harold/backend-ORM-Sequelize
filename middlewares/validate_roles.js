const models = require("../database/models/index");

const isAdminRoles = (req, res, next) => {
    if (!req.rolesAdministrative) {
        return res.status(500).json({
            msg: 'Administrative sin roles'
        });
    };
    const roleExists = req.rolesAdministrative.find(role => role.name === 'Administrador');

    if (!roleExists) {
        return res.status(401).json({
            msg: 'El administativo no tiene un rol de administrador'
        });
    }

    next();
}

const validateRol = (permissions_name) => {
    return async (req, res, next) => {
        if (!req.rol_id) {
            return res.status(500).json({
                msg: 'Administrativo sin roles'
            });
        };
        const rolePermissions = await models.roles_permissions.findAll(
            {
                attributes: ['permissions_id'],
                where: {
                    roles_id: req.rol_id
                }
            }
        );
        if (rolePermissions.length > 0) {
            console.log('Tiene permisos');
        } else {
            return res.status(401).json({
                msg: "El administativo no tiene ningun permiso "
            });
        }
        const permissions = await models.permissions.findAll({
            attributes: ['id'],
            where: {
                name: permissions_name
            }
        });
        if (permissions.length === 0)
            return res.status(401).json({
                msg: 'El permiso ' + permissions_name + ' no existe'
            });
        const contieneId = rolePermissions.some(permiso =>
            permiso.permissions_id === permissions[0].id);
        if (contieneId) {
            console.log(`El adminstrativo tiene el permiso ${permissions_name}`);
        } else {
            return res.status(401).json({
                msg: 'El administativo no tiene el permiso ' + permissions_name
            });
        }
        next();
    }
}

module.exports = {
    validateRol
}