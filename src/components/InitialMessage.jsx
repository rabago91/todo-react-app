import React from 'react';

export function InitialMessage({ todos, getPrevCompletedTasksNumber }) {

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
    const completedText = `🏆 ${getPrevCompletedTasksNumber()} `

    return (
            <div id='message-bar'>
                <div id='to-complete'>{text}</div>
                <div id='completed'> {completedText}</div>
            </div>

    )
}
