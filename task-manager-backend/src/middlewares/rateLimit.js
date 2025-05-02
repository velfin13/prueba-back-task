import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
  message: {
    success: false,
    message: 'Demasiados intentos de login. Inténtalo de nuevo más tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
