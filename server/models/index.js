const User = require('./User');
const Note = require('./Notes');
const Todo = require('./Todo');

User.hasMany(Note, { foreignKey: 'userId', sourceKey: 'id' });
Note.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
User.hasMany(Todo, { foreignKey: 'userId', sourceKey: 'id' });
Todo.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

module.exports = { User, Note, Todo };
