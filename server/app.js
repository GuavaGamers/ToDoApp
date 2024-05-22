const express = require('express');
const app = express();
const PORT = 3000;

const todoRoutes = require('./routes/todoRoutes');
const notesRoutes = require('./routes/notesRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded());

// add routes here
app.use('/api/todos', todoRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
