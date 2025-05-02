import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const existsEmail = await User.findOne({ where: { email } });
    if (existsEmail) return errorResponse(res, 'El email ya está registrado');

    const existsUsername = await User.findOne({ where: { username } });
    if (existsUsername) return errorResponse(res, 'El nombre de usuario ya está en uso');

    const user = await User.create({ username, email, password });
    return successResponse(
      res,
      'Usuario registrado correctamente',
      { id: user.id, username: user.username, email: user.email },
      201
    );
  } catch (err) {
    return errorResponse(res, err.message, [], 500);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return errorResponse(res, 'Credenciales inválidas', [], 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, 'Credenciales inválidas', [], 401);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1w',
      }
    );


    return successResponse(res, 'Inicio de sesión exitoso', { token });
  } catch (err) {
    return errorResponse(res, err.message, [], 500);
  }
}

export async function getProfile(req, res) {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'createdAt'],
    });

    if (!user) {
      return errorResponse(res, 'Usuario no encontrado', [], 404);
    }

    return successResponse(res, 'Perfil obtenido exitosamente', user);
  } catch (err) {
    return errorResponse(res, err.message, [], 500);
  }
}

export async function updateProfile(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return errorResponse(res, 'Usuario no encontrado', [], 404);

    const { email, username, passwordActual, nuevaPassword } = req.body;

    if (email && email !== user.email) {
      const exists = await User.findOne({ where: { email } });
      if (exists) return errorResponse(res, 'El email ya está en uso');
      user.email = email;
    }

    if (username && username !== user.username) {
      const exists = await User.findOne({ where: { username } });
      if (exists) return errorResponse(res, 'El nombre de usuario ya está en uso');
      user.username = username;
    }

    if (nuevaPassword) {
      if (!passwordActual) {
        return errorResponse(res, 'Debes ingresar la contraseña actual para cambiarla', [], 400);
      }

      const isMatch = await bcrypt.compare(passwordActual, user.password);
      if (!isMatch) {
        return errorResponse(res, 'La contraseña actual es incorrecta', [], 401);
      }

      user.password = await bcrypt.hash(nuevaPassword, 10);
    }

    await user.save();

    return successResponse(res, 'Perfil actualizado correctamente', {
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    return errorResponse(res, err.message, [], 500);
  }
}
