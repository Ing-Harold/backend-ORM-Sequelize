const models = require("../database/models/index");
const { registerBitacoras } = require("../helpers/bitacora.helpers");
const { __Permisos, __RolesPermisos, __Asignar, __Eliminar, __Delete, __Put } = require("../resources/var");

const assignPermissionsToRol = async (req, res) => {
    const { permissions_ids } = req.body;
    const roles_id = req.params.id;
    const t = await models.sequelize.transaction();
    try {
        console.log(permissions_ids + "abbbbbbbbbbb");
        for (const permissions_id of permissions_ids) {
            console.log(permissions_id + "aaaaaaaaaa");
            const response = await models.roles_permissions.create(
                { roles_id, permissions_id },
                { transaction: t }
            );
        };
        await registerBitacoras(
            __Asignar + ' ' + __Permisos, __RolesPermisos, __Put, req.user_id,
            { roles_id, permissions_ids });
        await t.commit();
        return res.status(201).json({
            message: 'Asign Role to Administrative successfully',
            body: {
                roles_id, permissions_ids
            }
        });
    } catch (err) {
        await t.rollback();
        return res.status(500).json({
            message: 'Error al asignar permisos al rol ' + roles_id + ' en la db - ' + err,
            body: {
                permissions_ids,
                roles_id
            }
        });
    }
}

const getPermissionsFromRol = async (req, res) => {
    const roles_id = req.params.id;
    try {
        const response = await models.roles_permissions.findAll({
            where: {
                roles_id,
            },
            attributes: ['permissions_id'],
        })
        return res.status(200).json(
            response
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err,
        });
    }
}

const deletePermissionsToRol = async (req, res) => {
    const roles_id = req.params.id;
    try {
        const response = await models.roles_permissions.destroy({
            where: {
                roles_id
            }
        });
        await registerBitacoras(
            __Eliminar + ' Permisos', __RolesPermisos, __Delete, req.user_id, { roles_id });
        res.status(200).json({
            message: 'Role delete successfully',
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error al eliminar permisos al rol ' + roles_id + ' en la db - ' + err
        });
    }
}

// const _getAdministrativeRolesByAdministrative_Id = async (administrative_id) => {
//     try {
//         const response = await pool.query(
//             'select roles.* ' +
//             'from roles ' +
//             'where roles.id in (select administrative_roles.roles_id ' +
//             'from administrative_roles ' +
//             'where administrative_roles.administrative_id = $1' +
//             ')',
//             [administrative_id]
//         );
//         return response.rows;
//     } catch (err) {
//         return res.status(500).json({
//             message: 'Error al eliminar permisos al rol ' + id + ' en la db - ' + err
//         });
//     }
//}

module.exports = {
    assignPermissionsToRol,
    getPermissionsFromRol,
    deletePermissionsToRol,
} 