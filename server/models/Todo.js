const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Todo = sequelize.define('todos', {
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
    // add validation in route to ensure only 1-3(high medium low)
    // front end add conditional if 1, display 'high'
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isOverdue: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Todo;
