import React, {Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from "./components/TodoList";
import { InitialMessage } from "./components/InitialMessage";
import jsonBase from "./structure_test.json"

const KEY = "todoApp.todos1984.";

export function App() {
    const [todos, setTodos] = useState(
        jsonBase
    );

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos]);

    const getPrevCompletedTasksNumber = () => {
        const todosCopy = {
            ...todos
        }
        return todosCopy.credits.completedTasksCredits
    }

    const setCompletedTasks = (completedTasksNumber) => {
        const prevCompletedTasks = getPrevCompletedTasksNumber();
        const completedTasks = prevCompletedTasks + completedTasksNumber;
        setTodos((prevTodos) => {
            const updatedCompletedTasksNumber = {
                ...prevTodos
            };
            updatedCompletedTasksNumber.credits.completedTasksCredits = completedTasks;
            return updatedCompletedTasksNumber
        })
    }

    const toggleTodo = (id) => {
        const newTodos = {
            ...todos
        };
        const todo = newTodos.tasks.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);

    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;

        setTodos((prevTodos) => {
            const updatedTodos = {
                ...prevTodos
            };
            const newTasks = [...updatedTodos.tasks, {id: uuidv4(), task, completed: false}];
            updatedTodos.tasks = newTasks;
            return updatedTodos
        })

        todoTaskRef.current.value = null;
    }

    const handleClearAll = () => {
        const updatedTodos = {
            ...todos
        };
        const newTodos = updatedTodos.tasks.filter((todo) => !todo.completed);
        updatedTodos.tasks = newTodos;
        const clearedNumber = todos.tasks.length - newTodos.length
        setCompletedTasks(clearedNumber);
        setTodos(updatedTodos);
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleTodoAdd();
        }
      }

    return (
        <Fragment>
            <div>
                <InitialMessage todos={todos.tasks} getPrevCompletedTasksNumber={getPrevCompletedTasksNumber}/>
            </div>
            <TodoList todos={todos.tasks} toggleTodo={toggleTodo}/>
            <div className="new-task-bar">
                <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" onKeyDown={_handleKeyDown}/>
                <div className="handleButtons">
                    <button onClick={handleTodoAdd}>
                        <span role="img" aria-label="Plus">➕</span>
                    </button>
                    <button className="trash-button" onClick={handleClearAll}>
                        <img className="trash_icon" src="trash-can-icon.png" alt="" />
                    </button>
                </div>
            </div>
        </Fragment>
    );
}