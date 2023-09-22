const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dbConfig = require('./src/config/dbConfig');
const cors = require("cors");
const customEnv = require('custom-env');

customEnv.env(process.env.NODE_ENV);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet()); /*Helmet aiuta a proteggere l'applicazione Express configurando vari header HTTP.*/
app.use(cors());
app.use(express.json());
app.use(morgan('combined')); /*E usato per loggare le richieste HTTP in console.*/

/*
* Inizializazione del server e sincronizzazione del database
* */
const startServer = async () => {
    try {
        await dbConfig.connect();
        await dbConfig.syncDatabase();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`ENV: ${process.env.NODE_ENV}`);
        });
    } catch (err) {
        console.error('Unable to start the server:', err);
        process.exit(1);
    }
};

startServer();
