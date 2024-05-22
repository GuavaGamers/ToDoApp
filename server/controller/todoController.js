const { User, Todo, Note } = require('../models');

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    if (!todos) res.status(404).send('could not find todos...');
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
  }
};

const getOneTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findByPk(todoId);
    if (!todo) res.status(404).send('todo does not exist...');
    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllTodos, getOneTodo };
