const express = require('express');
const app = express();
const PORT = 3000;

const todoRoutes = require('./routes/todoRoutes');

app.use(express.json());
app.use(express.urlencoded());

// add routes here
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
