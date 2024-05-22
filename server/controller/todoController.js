const { Todo, User } = require('../models');

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ include: [User] });
    if (!todos) res.status(404).send('could not find todos...');
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
  }
};

const getOneTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findByPk(todoId, { include: [User] });
    if (!todo) res.status(404).send('todo does not exist...');
    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
  }
};

const addTodo = async (req, res) => {
  try {
    const todoData = req.body;
    const userId = req.params.userId;

    const user = await User.findByPk(userId);
    if (!user) res.status(404).send('user does not exist...');

    await user.addTodo(todoData);

    const newTodo = await Todo.findOne({ where: { name: todoData.name } });
    if (!newTodo) res.status(404).send('cannot find newly created todo...');
    res.status(202).json(newTodo);
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findByPk(todoId);
    if (!todo) res.status(404).send('cannot find todo...');

    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) res.status(404).send('user does not exist...');

    await user.removeTodo(todo);
    res.status(200).send('todo successfully removed...');
  } catch (error) {
    console.error(error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const newTodoInfo = req.body;
    const todoId = req.params.todoId;
    const todo = await Todo.findByPk(todoId);
    if (!todo) res.status(404).send('cannot find todo...');

    await todo.update(newTodoInfo);
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllTodos, getOneTodo, addTodo, deleteTodo, updateTodo };
