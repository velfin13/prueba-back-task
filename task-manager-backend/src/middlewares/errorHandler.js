import logger from '../config/logger.js';
import { errorResponse } from '../utils/response.js';

const errorHandler = (err, req, res, next) => {
    logger.error(`Error en ${req.method} ${req.originalUrl}: ${err.message}`);
    return errorResponse(res, err.message || 'Error interno del servidor', [], err.status || 500);
};

export default errorHandler;
