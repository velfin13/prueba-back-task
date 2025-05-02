import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from '../controllers/task.controller.js';
import { validateTask, validateTaskStatus } from '../validators/task.validator.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Operaciones relacionadas con tareas del usuario autenticado
 */

/**
 * @swagger
 * /tareas:
 *   get:
 *     summary: Listar todas las tareas del usuario autenticado
 *     security: [ { bearerAuth: [] } ]
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED]
 *         description: Filtrar por estado
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente
 */
router.get('/', getAllTasks);

/**
 * @swagger
 * /tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     security: [ { bearerAuth: [] } ]
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 */
router.post('/', validateTask, createTask);

/**
 * @swagger
 * /tareas/{id}:
 *   get:
 *     summary: Obtener una tarea por su ID
 *     security: [ { bearerAuth: [] } ]
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', getTaskById);

/**
 * @swagger
 * /tareas/{id}:
 *   put:
 *     summary: Actualizar completamente una tarea existente
 *     security: [ { bearerAuth: [] } ]
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 */
router.put('/:id', validateTask, updateTask);

/**
 * @swagger
 * /tareas/{id}/status:
 *   patch:
 *     summary: Actualizar solo el estado de una tarea
 *     security: [ { bearerAuth: [] } ]
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *     responses:
 *       200:
 *         description: Estado de la tarea actualizado correctamente
 */
router.patch('/:id/status', validateTaskStatus, updateTaskStatus);

/**
 * @swagger
 * /tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     security: [ { bearerAuth: [] } ]
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', deleteTask);

export default router;
