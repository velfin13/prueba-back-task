import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

/**
 * Middleware genérico para manejar errores de validación
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mapped = errors.array().map(err => ({
            field: err.path,
            message: err.msg,
        }));
        return errorResponse(res, 'Error de validación', mapped, 400);
    }
    next();
};

/**
 * Validar datos de registro
 */
export const validateRegister = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Formato de email inválido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleValidationErrors,
];

/**
 * Validar datos de login
 */
export const validateLogin = [
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Formato de email inválido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
    handleValidationErrors,
];

/**
 * Validar actualización de perfil
 */
export const validateProfileUpdate = [
    body('email')
        .optional()
        .isEmail().withMessage('Formato de email inválido'),
    body('passwordActual')
        .custom((value, { req }) => {
            if (req.body.nuevaPassword && !value) {
                throw new Error('Debes ingresar la contraseña actual para cambiarla');
            }
            return true;
        }),
    body('nuevaPassword')
        .optional()
        .isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
    handleValidationErrors,
];
