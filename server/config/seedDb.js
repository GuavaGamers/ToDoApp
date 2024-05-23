const sequelize = require('./db');
const { Note, User, Todo } = require('../models/index');
const userData = require('../seeds/user_data');
const noteData = require('../seeds/note_data');
const toDoData = require('../seeds/toDo_data');
async function seedDB() {
  try {
    await sequelize.sync({ force: true });
    console.log('All tables were successfully dropped and recreated');
    // Create users first
    const createdUsers = await Promise.all(
      userData.map((user) => User.create(user))
    );
    console.log('Users created successfully');
    // Create notes with valid userId
    const notePromises = noteData.map((note) => {
      const user = createdUsers.find((u) => u.id === note.userId);
      if (user) {
        return Note.create(note);
      } else {
        console.error(`User with id ${note.userId} does not exist.`);
        return null;
      }
    });
    await Promise.all(notePromises);
    console.log('Notes created successfully');
    // Create todos with valid userId
    const toDoPromises = toDoData.map((todo) => {
      const user = createdUsers.find((u) => u.id === todo.userId);
      if (user) {
        return Todo.create(todo);
      } else {
        console.error(`User with id ${todo.userId} does not exist.`);
        return null;
      }
    });
    await Promise.all(toDoPromises);
    console.log('Todos created successfully');
    console.log(
      'All users, notes, and todos have been created and seeded successfully'
    );
  } catch (error) {
    console.error(
      'Error syncing our models or problem with seeding our database',
      error
    );
  }
}
// Invoke the function to seed information into the database
seedDB();
