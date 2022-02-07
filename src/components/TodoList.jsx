import React from 'react';
import { TodoItem } from './TodoItem';


export function TodoList({ todos, toggleTodo }) {
  return (
  <ol>
      {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
  </ol>)
}
