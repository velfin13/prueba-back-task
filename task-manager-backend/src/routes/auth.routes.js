import { Router } from 'express';
import {
    getProfile,
    login,
    register,
    updateProfile,
} from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.js';
import { loginRateLimiter } from '../middlewares/rateLimit.js';
import {
    validateLogin,
    validateRegister,
    validateProfileUpdate,
} from '../validators/auth.validator.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para registro e inicio de sesión
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: El usuario ya existe
 */
router.post('/register', validateRegister, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso con token JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', loginRateLimiter, validateLogin, login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     security: [ { bearerAuth: [] } ]
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Perfil del usuario
 */
router.get('/me', authenticate, getProfile);

/**
 * @swagger
 * /auth/me:
 *   put:
 *     summary: Actualizar perfil del usuario autenticado
 *     description: Permite cambiar el username, email y contraseña del usuario autenticado. Para cambiar la contraseña, se debe enviar también la contraseña actual.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nuevo nombre de usuario (opcional)
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Nuevo correo electrónico (opcional)
 *               passwordActual:
 *                 type: string
 *                 description: Contraseña actual (requerida para cambiar contraseña)
 *               nuevaPassword:
 *                 type: string
 *                 minLength: 6
 *                 description: Nueva contraseña (opcional)
 *           example:
 *             username: velfinNuevo
 *             email: nuevo@correo.com
 *             passwordActual: secreto123
 *             nuevaPassword: nuevoSecreto456
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *             example:
 *               success: true
 *               message: Perfil actualizado correctamente
 *               data:
 *                 id: 1
 *                 username: velfinNuevo
 *                 email: nuevo@correo.com
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autorizado o contraseña incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.put('/me', authenticate, validateProfileUpdate, updateProfile);

export default router;
