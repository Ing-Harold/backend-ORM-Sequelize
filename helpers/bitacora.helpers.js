const models = require("../database/models/index");

const registerBitacoras = async (event, 
    table_type, action , user_id , values) => {
    try {
        console.log(event);
        const bitacoras = await models.bitacoras.create({
            event,
            table_type,
            action, 
            user_id,
            values
        });
        console.log('regsiterBitacoras')
    } catch (error) {
        throw new Error('Error al regsitrar en bitacora en la db' + error);
    }
}

module.exports  = {
    registerBitacoras
};