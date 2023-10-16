require('dotenv').config();

//const { sequelize } = require('./database/database');

const Server = require('./server');
const server = new Server();
const db  = require('./database/models/index');
async function main(){
    try {
        //await db.sequelize.sync({force:false});
        //console.log(db.sequelize);
        //await sequelize.sync({force: false});//refresh database
        console.log('Connection has been established successfully db.');
        server.listen();
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
}

main();

