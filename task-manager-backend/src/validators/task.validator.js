import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

const allowedStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

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
 * Validaciones para crear o actualizar una tarea completa
 */
export const validateTask = [
  body('title')
    .notEmpty()
    .withMessage('El título es obligatorio'),
  body('status')
    .optional()
    .isIn(allowedStatuses)
    .withMessage(`El estado debe ser uno de: ${allowedStatuses.join(', ')}`),
    body('dueDate')
    .customSanitizer(value => value === '' ? null : value)
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('La fecha de vencimiento debe tener el formato YYYY-MM-DD'),  
  handleValidationErrors,
];

/**
 * Validaciones específicas para cambiar el estado de una tarea
 */
export const validateTaskStatus = [
  body('status')
    .notEmpty()
    .withMessage('El estado es obligatorio')
    .isIn(allowedStatuses)
    .withMessage(`El estado debe ser uno de: ${allowedStatuses.join(', ')}`),
  handleValidationErrors,
];
