import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return errorResponse(res, 'Token requerido', [], 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, 'Token inválido o expirado', [], 403);
  }
};
