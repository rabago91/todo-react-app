import React from 'react';

export function TodoItem({ todo, toggleTodo }) {
    const {id, task, isCompleted } = todo

    const handleTodoClick = () => {
        toggleTodo(id);
    }

    return (
        <li>
            <input type="checkbox" checked={isCompleted} onChange={handleTodoClick} />
            <div className='task'>{task}</div>
        </li>
    );
}
