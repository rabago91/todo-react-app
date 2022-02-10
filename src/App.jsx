import React, {Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from "./components/TodoList";
import { InitialMessage } from "./components/InitialMessage";

const KEY = "todoApp.todos";
const COMPLETEDTASKSKEY = "todoApp.completedTasks";

export function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: 'Escribe tus Tareas por hacer', completed: false},
    ]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos) {
            setTodos(storedTodos);
        }
        if (!!!getPrevCompletedTasksNumber()) {
            localStorage.setItem(COMPLETEDTASKSKEY, JSON.stringify(0));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos]);

    const getPrevCompletedTasksNumber = () => {
        return JSON.parse(localStorage.getItem(COMPLETEDTASKSKEY))
    }

    const setCompletedTasks = (completedTasksNumber) => {
        var prevCompletedTasks = 0;
        if (!!getPrevCompletedTasksNumber()) {
            prevCompletedTasks = getPrevCompletedTasksNumber()
        }
        const completedTasks = prevCompletedTasks + completedTasksNumber;
        localStorage.setItem(COMPLETEDTASKSKEY, JSON.stringify(completedTasks));
    }

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, completed: false}]
        })

        todoTaskRef.current.value = null;
    }

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        const clearedNumber = todos.length - newTodos.length
        setCompletedTasks(clearedNumber);
        setTodos(newTodos);
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleTodoAdd();
        }
      }

    return (
        <Fragment>
            <div>
                <InitialMessage todos={todos} getPrevCompletedTasksNumber={getPrevCompletedTasksNumber}/>
            </div>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <div className="new-task-bar">
                <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" onKeyDown={_handleKeyDown}/>
                <div className="handleButtons">
                    <button onClick={handleTodoAdd}>➕</button>
                    <button className="trash-button" onClick={handleClearAll}>
                        <img className="trash_icon" src="trash-can-icon.png" alt="" />
                    </button>
                </div>
            </div>
        </Fragment>
    );
}