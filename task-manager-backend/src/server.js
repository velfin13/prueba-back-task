import { app, sequelize, initModels } from './app.js';
import logger from './config/logger.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Conexión a la base de datos establecida correctamente.');

        await initModels();

        app.listen(PORT, () => {
            logger.info(`Servidor escuchando en puerto ${PORT}`);
        });
    } catch (error) {
        logger.error(`No se pudo conectar a la base de datos: ${error.message}`);
        process.exit(1);
    }
};

startServer();
