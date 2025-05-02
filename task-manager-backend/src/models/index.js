import sequelize from '../config/db.js';
import Task from './task.model.js';
import User from './user.model.js';

const initModels = async () => {
  await sequelize.sync({ alter: true });
};

export { sequelize, initModels, Task, User };
