const router = require('express').Router();

const {
  getAllTodos,
  getOneTodo,
  addTodo,
  deleteTodo,
  updateTodo,
} = require('../controller/todoController');

router.get('/', getAllTodos);
router.get('/:todoId', getOneTodo);
router.post('/:userId', addTodo);
router.delete('/:userId/:todoId', deleteTodo);
router.put('/:todoId', updateTodo);

module.exports = router;
