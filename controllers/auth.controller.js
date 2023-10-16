// const { Pool } = require('pg');
// const { database } = require('../keys');
const bcryptsjs = require('bcryptjs');
const models = require("../database/models/index");
const { generateJWT } = require('../helpers/generate-jwt');
const { registerBitacoras } = require('../helpers/bitacora.helpers');

// const pool = new Pool(database);

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const passwordVerify = await models.persons.findOne({
            where: { email }, include: [{model: models.administratives, as: 'administratives'}],//Administrative
        });
        if (!passwordVerify) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        console.log('consulta del gmail' + passwordVerify.administratives.id);
        const validPassword = bcryptsjs.compareSync(password, passwordVerify.administratives.password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'Contraseña incorrecta'
            });
        }
        const token = await generateJWT(passwordVerify.administratives.id);
        const { id, ci, name, telephone, estado} = passwordVerify;
        path_image = passwordVerify.administratives.path_image;
        await registerBitacoras('login', null, 'post', passwordVerify.administratives.id, email);

        res.status(200).json({
            message: 'Login successfully',
            body: {
                id, ci, name, telephone, estado, path_image 
            },
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al login en la db ' + error
        });
    }
}

const tokenVerify = async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Token valido',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Token error' + error
        });
    }
}

module.exports = {
    login,
    tokenVerify
};
