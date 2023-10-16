const bcryptsjs = require('bcryptjs');
const models = require("../database/models/index");
const { __Administrativos, __Desactivar, __Put, __Activar, __Editar, __Crear } = require('../resources/var');
const { registerBitacoras } = require('../helpers/bitacora.helpers');

const createAdministrative = async (req, res) => {
    const { ci = '', email, name, path_image, description,
        telephone = '', sexo = null, password = '', roles_id } = req.body;
    const salt = bcryptsjs.genSaltSync(10);
    const encryptedPassword = bcryptsjs.hashSync(password, salt);
    const t = await models.sequelize.transaction();
    try {
        const person = await models.persons.create(
            { ci, name, email, telephone, sexo },
            { transaction: t }
        );
        console.log(person);
        await models.administratives.create({
            // Atributos específicos de Administrative
            path_image,
            password: encryptedPassword,
            persons_id: person.id, // Asocia el registro administrativo con la persona
            roles_id
        }, { transaction: t });
        await registerBitacoras(
            __Crear + ' ' + __Administrativos, __Administrativos, __Put, req.user_id, 
            {  name, email, ci, telephone, sexo });
        await t.commit();
        return res.status(201).json({
            message: 'Administrative created successfully',
            body: {
                administrative: { name, email, path_image, description, telephone, sexo }
            }
        });

    } catch (error) {
        await t.rollback();
        return res.status(500).json({
            message: 'Error al insertar administrative en la db, ' + error
        });
    }
}

const getAdministrative = async (req, res) => {
    try {
        response = await models.administratives.findAll({
            include: [{
                model: models.persons, as: 'persons',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
        });

        const formattedResponse = response.map((admin) => {
            const { persons, password, ...adminData } = admin.dataValues;
            return {
                ...adminData,
                ...admin.persons.dataValues, // Copia los atributos de 'persons'
            };
        });

        res.status(200).json(formattedResponse);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener administrative en la db, ' + error
        });
    }
}

const getAdministrativeById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await await models.administratives.findOne({
            where: {
                id,

            },
            include: [{
                model: models.persons, as: 'persons',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
        });
        const { persons, password, ...adminData } = response.dataValues;
        const formattedResponse = {
            ...adminData,
            ...response.persons.dataValues, // Copia los atributos de 'persons'
        };
        res.status(200).json(formattedResponse);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener administrative ' + id + 'en la db - ' + error
        });
    }
}

const putAdministrativeById = async (req, res) => {
    const id = req.params.id;
    const { name = '', email, ci = '', telephone, sexo='' } = req.body;
    try {
        const administrative = await models.administratives.findByPk(id, {
            include: [{
                model: models.persons,
                as: 'persons', 
            }],
        });
        await  administrative.persons.update({ name, email, ci, telephone, sexo });
        await registerBitacoras(
            __Editar + ' ' + __Administrativos, __Administrativos, __Put, req.user_id, 
            { id, name, email, ci, telephone, sexo });
        return res.status(200).json({
            message: 'Administrative update successfully',
            body: {
                name, id, email, ci, telephone, sexo
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar administrative ' + id + ' en la db - ' + error
        });
    }
}

const deleteAdministrative = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('delete from administrative where id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Administrative delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar administrative ' + id + ', ' + error
        });
    }
}

const deleteLogAdministrative = async (req, res) => {
    const id = req.params.id;
    try {
        const administrative = await models.administratives.findByPk(id, {
            include: [{
                model: models.persons,
                as: 'persons', // Asegúrate de utilizar el alias correcto que corresponde a la relación en tu modelo
            }],
        });
        administrative.persons.update({ estado: false });
        await registerBitacoras(
                __Desactivar + ' ' + __Administrativos, __Administrativos, __Put, req.user_id, { id });
        res.status(200).json({ 
            message: 'logically removed administrative successfully' 
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar administrative ' + id + ', ' + error
        });
    }
}

const activeAdministrative = async (req, res) => {
    const id = req.params.id;
    try {
        const administrative = await models.administratives.findByPk(id, {
            include: [{
                model: models.persons,
                as: 'persons', // Asegúrate de utilizar el alias correcto que corresponde a la relación en tu modelo
            }],
        });
        await administrative.persons.update({ estado: true });
        await registerBitacoras(
                __Activar + ' ' + __Administrativos, __Administrativos, __Put, req.user_id, { id });      
        res.status(200).json({
            message: 'active administrative successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar administrative ' + id + ', ' + error
        });
    }
}

const putAdministrativePassword = async (req, res) => {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    administrative = await models.administratives.findByPk(id);
    const validPassword = bcryptsjs.compareSync(oldPassword, administrative.password); 
    if (!validPassword) {
        return res.status(400).json({
            message: 'Contraseña incorrecta',
        });
    }

    const salt = bcryptsjs.genSaltSync(10);
    const encryptedPassword = bcryptsjs.hashSync(newPassword, salt);
    try {
        const response = administrative.update({ password: encryptedPassword});
        await registerBitacoras(
            __Editar + ' ' + __Administrativos, __Administrativos, __Put, req.user_id, { id });
    
        return res.status(200).json({
            message: 'Administrative update password successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar administrative ' + id + ' en la db - ' + error
        });
    }
}

const getNewsByAdminID = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(`select n.* 
            from news n
            where n.cargo_id in (select ac.cargo_id 
                                from admin_cargo ac
                                where ac.admin_id in ( select a.id 
                                                from administrative a
                                                where a.id = $1) 
                            )`, [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener noticiasByAdminID ' + id + 'en la db - ' + error
        });
    }
}

const getEventsByAdminID = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(`select e.* 
            from events e
            where e.cargo_id in (select ac.cargo_id 
                                from admin_cargo ac
                                where ac.admin_id in ( select a.id 
                                                from administrative a
                                                where a.id = $1) 
                            )`, [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener noticiasByAdminID ' + id + 'en la db - ' + error
        });
    }
}

const updateEstadoNewsByAdminID = async (req, res) => {
    const id = req.params.id;
    const news_id = req.params.news_id;
    const { state_id } = req.body;
    try {
        const response = await pool.query(`update news set state_id = $1
        where id = $2`, [state_id, news_id]);
        return res.status(200).json({
            message: 'Noticia update state successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar estadoNoticiasByAdminID ' + id + 'en la db - ' + error
        });
    }
}

const updateEstadoEventByAdminID = async (req, res) => {
    const id = req.params.id;
    const event_id = req.params.event_id;
    const { state_id } = req.body;
    try {
        const response = await pool.query(`update events set state_id = $1
        where id = $2`, [state_id, event_id]);
        return res.status(200).json({
            message: 'Evento update state successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar estadoEventosByAdminID ' + id + 'en la db - ' + error
        });
    }
}

module.exports = {
    createAdministrative,
    getAdministrative,
    getAdministrativeById,
    putAdministrativeById,
    deleteAdministrative,
    deleteLogAdministrative,
    activeAdministrative,
    putAdministrativePassword,
    getNewsByAdminID,
    getEventsByAdminID,
    updateEstadoNewsByAdminID,
    updateEstadoEventByAdminID
}