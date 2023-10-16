const models = require("../database/models/index");

const getPermissions = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await models.permissions.findAll();
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener cargos en la db - ' + error
        });
    }
}

module.exports = {
    getPermissions
}