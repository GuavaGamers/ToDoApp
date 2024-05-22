const User = require('./User');
const Notes = require('./Notes');
const Todo = require('./Todo');

User.hasMany(Notes);
Notes.belongsTo(User);

User.hasMany(Todo);
Todo.belongsTo(User);

module.exports = { User, Notes, Todo };
