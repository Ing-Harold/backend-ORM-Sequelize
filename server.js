const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.bitacorasPath = '/api/bitacoras';
        this.rolesPath = '/api/roles';
        this.permissionsPath = '/api/permissions';
        this.administrativePath = '/api/administrative';
        this.roles_permissionsPath = '/api/roles_permissions';
        this.authPath = '/api/auth';
        // this.careersPath = '/api/careers';
        // this.docentesPath = '/api/docentes';
        
        
        this.uploadsPath = '/api/uploads';
        // this.categoriesPath = '/api/categories';
        // this.statePath = '/api/state';
        // this.newsPath = '/api/news';
        // this.eventsPath = '/api/events';
        // this.studentsPath = '/api/students';
        // this.studentsEventsPath = '/api/students_events';
        
        // this.docentesCareersPath = '/api/docente_careers';
        // this.studentsCareersPath = '/api/students_careers';
        // this.cargoPath = '/api/cargo';
        // this.adminCargoPath = '/api/admin_cargo';
        // this.facultativeUnitsPath = '/api/facultative_units';
        
        
        //middleware
        this.middleware();

        //routes
        this.routes();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
        this.app.use('/uploads', express.static('uploads'));
    }

    routes() {
        this.app.use(this.bitacorasPath, require('./routes/bitacoras.routes'));
        this.app.use(this.rolesPath, require('./routes/roles.routes'));
        this.app.use(this.permissionsPath, require('./routes/permissions.routes'));
        this.app.use(this.administrativePath, require('./routes/administrative.routes'));
        this.app.use(this.authPath, require('./routes/auth.routes'));
        this.app.use(this.roles_permissionsPath , require('./routes/roles_permissions.routes'));
        // this.app.use(this.careersPath, require('./routes/careers'));
        // this.app.use(this.docentesPath, require('./routes/docentes'));
        this.app.use(this.uploadsPath, require('./routes/uploads'));
        // this.app.use(this.categoriesPath, require('./routes/categories'));
        // this.app.use(this.statePath, require('./routes/state'));
        // this.app.use(this.newsPath, require('./routes/news'));
        // this.app.use(this.eventsPath, require('./routes/events'));
        // this.app.use(this.studentsPath, require('./routes/students'));
        // this.app.use(this.studentsEventsPath, require('./routes/students_events'));
        // this.app.use(this.docentesCareersPath, require('./routes/docentes_careers'));
        // this.app.use(this.studentsCareersPath, require('./routes/student_careers'));
        // this.app.use(this.cargoPath, require('./routes/cargo'));
        // this.app.use(this.adminCargoPath, require('./routes/admin_cargo'));
        // this.app.use(this.facultativeUnitsPath, require('./routes/facultativeUnits'))
        
    }

    listen() {
        this.app.listen(this.port, (err) => {
            if (err) throw new Error(err)
            else console.log('server on port 3000, SERVER FICCT');
        });
    }
}

module.exports = Server;