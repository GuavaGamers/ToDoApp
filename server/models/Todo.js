const Sequelize = require('sequelize');
const db = require('../config/db');

const Todo = db.define('todos', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  priority: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    // add validation in route to ensure only 1-3(high medium low)
    // front end add conditional if 1, display 'high'
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  isOverdue: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Todo;
