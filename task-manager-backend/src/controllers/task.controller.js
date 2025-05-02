import Task from '../models/task.model.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function getAllTasks(req, res, next) {
  try {
    const { status } = req.query;
    const condition = { userId: req.user.id };
    if (status) condition.status = status;

    const tasks = await Task.findAll({ where: condition });
    return successResponse(res, 'Tareas obtenidas', tasks);
  } catch (err) {
    next(err);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) return errorResponse(res, 'Tarea no encontrada', [], 404);
    return successResponse(res, 'Tarea encontrada', task);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  const formatDateOnly = (date) => date.toISOString().split('T')[0];

  try {
    const { title, description, status, dueDate } = req.body;

    if (dueDate && dueDate !== '') {
      const dueFormatted = formatDateOnly(new Date(dueDate));
      const todayFormatted = formatDateOnly(new Date());

      if (dueFormatted < todayFormatted) {
        return errorResponse(
          res,
          'La fecha de vencimiento no puede ser anterior a la fecha actual',
          [],
          400
        );
      }
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate: dueDate === '' ? null : dueDate,
      userId: req.user.id,
    });

    return successResponse(res, 'Tarea creada exitosamente', task, 201);
  } catch (err) {
    next(err);
  }
}


export async function updateTask(req, res, next) {
  // Función utilitaria definida arriba para uso global
  const formatDateOnly = (date) => date.toISOString().split('T')[0];

  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) return errorResponse(res, 'Tarea no encontrada', [], 404);

    const { title, description, status, dueDate } = req.body;

    if (dueDate && dueDate !== '') {
      const dueFormatted = formatDateOnly(new Date(dueDate));
      const createdFormatted = formatDateOnly(new Date(task.createdAt));

      if (dueFormatted < createdFormatted) {
        return errorResponse(
          res,
          'La fecha de vencimiento no puede ser anterior a la fecha de creación',
          [],
          400
        );
      }
    }

    await task.update({
      title,
      description,
      status,
      dueDate: dueDate === '' ? null : dueDate,
    });

    return successResponse(res, 'Tarea actualizada', task);
  } catch (err) {
    next(err);
  }
}


export async function updateTaskStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) return errorResponse(res, 'Tarea no encontrada', [], 404);

    await task.update({ status });

    return successResponse(res, 'Estado actualizado', task);
  } catch (err) {
    next(err);
  }
}


export async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await Task.destroy({ where: { id, userId: req.user.id } });

    if (!deleted) return errorResponse(res, 'Tarea no encontrada', [], 404);

    return successResponse(res, 'Tarea eliminada');
  } catch (err) {
    next(err);
  }
}
