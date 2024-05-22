const express = require('express');
const router = express.Router();
const {
  createUser,
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
} = require('../controller/userController');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
