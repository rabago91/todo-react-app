import React from 'react';

export function InitialMessage({ todos, getPrevCompletedTasksNumber }) {

    const getMissingTodos = () => {
        return todos.filter((todo) => !todo.completed).length;
    }

    const textMessageValidation = () => {
        const missingTodosNumber = getMissingTodos();
        if (missingTodosNumber === 0) {
            return `No tienes tareas pendientes! 🏆 🕶`
        } else if ( missingTodosNumber === 1 ) {
            return `Te queda ${missingTodosNumber} tarea por terminar ✨`
        } else {
            return `Te quedan ${missingTodosNumber} tareas por terminar 👀`
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
