const User = require('./User');
const Note = require('./Notes');
const Todo = require('./Todo');

User.hasMany(Note);
Note.belongsTo(User);

User.hasMany(Todo);
Todo.belongsTo(User);

module.exports = { User, Note, Todo };
