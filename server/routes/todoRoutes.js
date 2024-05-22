const router = require('express').Router();

const { getAllTodos, getOneTodo } = require('../controller/todoController');

router.get('/', getAllTodos);
router.get('/:todoId', getOneTodo);

module.exports = router;
