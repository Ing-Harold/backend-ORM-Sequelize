const models = require("../database/models/index");
const { registerBitacoras } = require('../helpers/bitacora.helpers');
const {__Roles, __Post, __Put, __Delete, __Eliminar } = require('../resources/var');

// const {Rol} = require('../database/models/');

const createRoles = async (req, res) => {
    const { name } = req.body;
    try {
        const rol = await models.roles.create(
            { name });
        await registerBitacoras(
            'crear rol', __Roles, __Post, req.user_id,name);
        return res.status(201).json({
            message: 'Rule created successfully',
            body: {
                rol
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear rol en la db' + error
        });
    }
}

const getRoles = async (req, res) => {
    try {
        const bitacoras = await models.roles.findAll();
        res.status(200).json(bitacoras);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener rol en la db' + error
        });
    }
}

const getRolesById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await models.roles.findByPk(id);
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener rol ' + id + ' en la db - ' + error
        });
    }
}

const updateRolesById = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const response = await models.roles.update({ name }, {
            where: {
                id
            }
        });
        await registerBitacoras(
            'actualizar rol', __Roles, __Put, req.user_id,{id,name});
        res.status(200).json({
            message: 'Role updated successfully',
            body: response
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar rol ' + id + ' en la db - ' + error
        });
    }
}

const deleteRolesById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await models.roles.destroy({
            where: {
                id
            }
        });
        await registerBitacoras(
            __Eliminar + ' ' + __Roles , __Roles, __Delete, req.user_id,{id});
        res.status(200).json({
            message: 'Role delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar rol ' + id + ' en la db - ' + error
        });
    }
}

module.exports = {
    createRoles,
    getRoles,
    getRolesById,
    updateRolesById,
    deleteRolesById
}