import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './config/logger.js';
dotenv.config();

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import { initModels, sequelize } from './models/index.js';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  `http://localhost:${process.env.PORT}`
];


const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    logger.warn(`CORS bloqueado: ${origin}`);
    return callback(new Error('No autorizado por CORS'));
  },
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(json());
app.use(morgan('dev'));

// Rutas
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/tareas', taskRoutes);
app.use('/api/auth', authRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

export { app, sequelize, initModels };
