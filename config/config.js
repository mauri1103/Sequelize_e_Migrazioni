const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV || 'local');

//Configurazione per la gestione dei file creati nella cartella migrations
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
};
