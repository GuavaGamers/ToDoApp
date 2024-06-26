
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  List,
  ListItem,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import './Todo.css';

const Todo = ({ loggedInUser }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState(1);
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (loggedInUser && loggedInUser.todos) {
      setTodos(loggedInUser.todos);
    }
  }, [loggedInUser]);

  const handleAddTodo = () => {
    if (newTodo.trim() && newDueDate) {
      const newTask = {
        task: newTodo,
        dueDate: newDueDate,
        priority: newPriority,
        isCompleted: false,
        isOverdue: new Date(newDueDate) < new Date(),
        id: Date.now(),
      };
      setTodos([...todos, newTask]);
      setNewTodo('');
      setNewDueDate('');
      setNewPriority(1);
    }
  };

  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = id => {
    const todo = todos.find(todo => todo.id === id);
    setEditing(id);
    setEditingText(todo.task);
  };

  const handleSaveEdit = id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, task: editingText } : todo));
    setEditing(null);
    setEditingText('');
  };

  const handleToggleComplete = id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return todo.isCompleted;
    if (filter === 'Incomplete') return !todo.isCompleted;
    return true;
  });

  return (
    <div className="todo-page">
    <Box className="todo-container" maxW="600px" mx="auto" p={5} bg="gray.50" borderRadius="md" boxShadow="md">
      <Text className="todo-text" fontSize="2xl" mb={5}>To-Do List</Text>
      <Flex mb={5}>
        <Input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          mr={2}
        />
        <Input
          type="date"
          value={newDueDate}
          onChange={e => setNewDueDate(e.target.value)}
          mr={2}
        />
        <Select value={newPriority} onChange={e => setNewPriority(parseInt(e.target.value))} mr={2}>
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </Select>
        <Button className="todo-button-blue" colorScheme="blue" style={{ width: '250px'}} onClick={handleAddTodo}>Add Task</Button>
      </Flex>
      <Flex mb={5}>
        <Select value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </Select>
      </Flex>
      <List spacing={3}>
        {filteredTodos.map(todo => (
          <ListItem key={todo.id} p={3} bg="white" borderRadius="md" boxShadow="sm">
            <Flex alignItems="center">
              <Checkbox
                isChecked={todo.isCompleted}
                onChange={() => handleToggleComplete(todo.id)}
                mr={3}
              />
              {editing === todo.id ? (
                <Input
                  value={editingText}
                  onChange={e => setEditingText(e.target.value)}
                  mr={3}
                />
              ) : (
                <Text flex="1" textDecoration={todo.isCompleted ? 'line-through' : 'none'}>
                  {todo.task}
                </Text>
              )}
              <Text fontSize="sm" color="gray.500" mr={3}>
                {new Date(todo.dueDate).toLocaleDateString()}
              </Text>
              <Stack direction="row" spacing={2}>
                {editing === todo.id ? (
                  <Button className="todo-button-blue" size="sm" onClick={() => handleSaveEdit(todo.id)}>Save</Button>
                ) : (
                  <Button className="todo-button-blue" size="sm" onClick={() => handleEditTodo(todo.id)}>Edit</Button>
                )}
                <Button className="todo-button-red" size="sm" colorScheme="red" onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
              </Stack>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
    </div>
  );
};

export default Todo;
