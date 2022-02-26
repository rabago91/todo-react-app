import React from 'react';

export function InitialMessage({ todos, getPrevCompletedTasksNumber }) {

    const getMissingTodosNumber = () => {
        const missingTodosObject = todos.filter((todo) => !todo.isCompleted);
        return missingTodosObject.length
    }

    const textMessageValidation = () => {
        const missingTodosNumber = getMissingTodosNumber();
        if (missingTodosNumber === 0) {
            const icon = <span role="img" aria-label="glasses"> 🕶</span>
            return <>No tienes tareas pendientes! {icon}</>
        } else if ( missingTodosNumber === 1 ) {
            const icon = <span role="img" aria-label="sparkle">✨</span>
            return <>Te queda 1 tarea por terminar {icon}</>
        } else {
            const icon = <span role="img" aria-label="eyes">👀</span>
            return <>Te quedan {missingTodosNumber} tareas por terminar {icon}</>
        }
    };


    const completedTextIcon = () => {
         return (
             <>
             <span role="img" aria-label="Trophy">🏆</span> {getPrevCompletedTasksNumber()}
             </>
         )
    }
    const completedText = completedTextIcon()

    return (
            <div id='message-bar'>
                <div id='to-complete'>{textMessageValidation()}</div>
                <div id='completed'> {completedText}</div>
            </div>
    )
}
