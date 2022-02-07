import React from 'react';

export function InitialMessage({ todos }) {

    const getMissingTodos = () => {
        return todos.filter((todo) => !todo.completed).length;
    }

    const textMessageValidation = () => {
        if (getMissingTodos() === 0) {
            return `No tienes tareas pendientes! 🏆 🕶`
        } else if ( getMissingTodos() === 1 ) {
            return `Te queda ${getMissingTodos()} tarea por terminar ✨`
        } else {
            return `Te quedan ${getMissingTodos()} tareas por terminar 👀`
        }
    };

    const text = textMessageValidation()

    return (
        <div id='message'>{text}</div>
    )
}
