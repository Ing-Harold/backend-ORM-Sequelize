const models = require("../database/models/index");
 
const getBitacoras = async (req, res) => {
    try {
        const bitacoras = await models.bitacoras.findAll();
        res.status(200).json(bitacoras);
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener careera en la db' + error
        });
    }
}

module.exports = {
    getBitacoras
}