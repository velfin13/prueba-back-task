import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED'),
    defaultValue: 'PENDING',
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'tasks',
  timestamps: true,
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export default Task;
