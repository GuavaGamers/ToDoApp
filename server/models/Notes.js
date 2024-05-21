const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Note = sequelized.define('note', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // Make sure the title is not an empty string
            notEmpty: true
        }
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // Make sure the content is not an empty string
            notEmpty: true
        }
    }
})
module.exports = Note;