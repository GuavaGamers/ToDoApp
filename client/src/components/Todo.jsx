// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Checkbox,
//   Flex,
//   Input,
//   List,
//   ListItem,
//   Select,
//   Stack,
//   Text,
// } from '@chakra-ui/react';
// const Todo = ({ loggedInUser }) => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');
//   const [editing, setEditing] = useState(null);
//   const [editingText, setEditingText] = useState('');
//   const [filter, setFilter] = useState('All');
//   console.log(loggedInUser.todos)
//   const handleAddTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([...todos, { text: newTodo, completed: false, id: Date.now(), date: new Date().toLocaleString() }]);
//       setNewTodo('');
//     }
//   };
//   const handleDeleteTodo = id => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };
//   const handleEditTodo = id => {
//     const todo = todos.find(todo => todo.id === id);
//     setEditing(id);
//     setEditingText(todo.text);
//   };
//   const handleSaveEdit = id => {
//     setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editingText } : todo));
//     setEditing(null);
//     setEditingText('');
//   };
//   const handleToggleComplete = id => {
//     setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
//   };
//   const handleFilterChange = e => {
//     setFilter(e.target.value);
//   };
//   const filteredTodos = todos.filter(todo => {
//     if (filter === 'All') return todo;
//     if (filter === 'Completed') return todo.completed;
//     if (filter === 'Incomplete') return !todo.completed;
 
    
// });

// setTodos(filteredTodos)

  
//   return (
//     <Box maxW="600px" mx="auto" p={5} bg="gray.50" borderRadius="md" boxShadow="md">
//       <Text fontSize="2xl" mb={5}>Todo List</Text>
//       <Flex mb={5}>
//         <Input
//           value={newTodo}
//           onChange={e => setNewTodo(e.target.value)}
//           placeholder="Add a new todo"
//           mr={2}
//         />
//         <Button colorScheme="blue" onClick={handleAddTodo}>Add Task</Button>
//       </Flex>
//       <Flex mb={5}>
//         <Select value={filter} onChange={handleFilterChange}>
//           <option value="All">All</option>
//           <option value="Completed">Completed</option>
//           <option value="Incomplete">Incomplete</option>
//         </Select>
//       </Flex>
//       <List spacing={3}>
//         {loggedInUser && loggedInUser.todos.map(todo => (
//           <ListItem key={todo.id} p={3} bg="white" borderRadius="md" boxShadow="sm">
//             <Flex alignItems="center">
//               <Checkbox
//                 isChecked={todo.completed}
//                 onChange={() => handleToggleComplete(todo.id)}
//                 mr={3}
//               />
//               {editing === todo.id ? (
//                 <Input
//                   value={editingText}
//                   onChange={e => setEditingText(e.target.value)}
//                   mr={3}
//                 />
//               ) : (
//                 <Text flex="1" textDecoration={todo.completed ? 'line-through' : 'none'}>
//                   {todo.text}
//                 </Text>
//               )}
//               <Text fontSize="sm" color="gray.500" mr={3}>
//                 {todo.date}
//               </Text>
//               <Stack direction="row" spacing={2}>
//                 {editing === todo.id ? (
//                   <Button size="sm" onClick={() => handleSaveEdit(todo.id)}>Save</Button>
//                 ) : (
//                   <Button size="sm" onClick={() => handleEditTodo(todo.id)}>Edit</Button>
//                 )}
//                 <Button size="sm" colorScheme="red" onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
//               </Stack>
//             </Flex>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// };
// export default Todo;

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
    <Box maxW="600px" mx="auto" p={5} bg="gray.50" borderRadius="md" boxShadow="md">
      <Text fontSize="2xl" mb={5}>Todo List</Text>
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
        <Button colorScheme="blue" onClick={handleAddTodo}>Add Task</Button>
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
                  <Button size="sm" onClick={() => handleSaveEdit(todo.id)}>Save</Button>
                ) : (
                  <Button size="sm" onClick={() => handleEditTodo(todo.id)}>Edit</Button>
                )}
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
              </Stack>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Todo;
