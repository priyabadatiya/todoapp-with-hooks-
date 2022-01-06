import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';


const getLocalTodos = () => {
  let list = localStorage.getItem('lists')
  if (list) {
    return JSON.parse(localStorage.getItem('lists'))
  } else {
    return [];
  }
}

function TodoList() {
  const [todos, setValue] = useState(getLocalTodos());
  
  const addTodo = todo => {
    if (!todo.text || !todo.text.trim()) {
      return;
    }

    const newTodos = [todo, ...todos];

    setValue(newTodos);
    console.log(...todos);
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todos));
  }, [todos])

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || !newValue.text.trim()) {
      return;
    }
    setValue(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    setValue(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setValue(updatedTodos);
  };
  console.log(getLocalTodos(), 'c1')
  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;