const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Note = sequelize.define('note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      // Make sure the title is not an empty string
      notEmpty: true,
    },
  },

  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      // Make sure the content is not an empty string
      notEmpty: true,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});
module.exports = Note;
