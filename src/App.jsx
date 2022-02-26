import React, {Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from "./components/TodoList";
import { InitialMessage } from "./components/InitialMessage";
import jsonBase from "./structure_test.json"

const KEY = "todoApp.todos1";
const currentProjectId = 1984;

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
        // console.log("----> Storing TODOS");
    }, [todos]);

    const getProjectArrayNumber = (projectId) => {
        // If the parameter 'projectId' is not entered in the function, it will take the 'currentProjectId' instead.
        let idValidation = currentProjectId;
        if (!!projectId) {
            idValidation = projectId
        }
        const newTodos = {
            ...todos
        };
        const project = newTodos.projects.find((project) => project.id === idValidation);
        const projectArrayNumber = newTodos.projects.indexOf(project);
        return projectArrayNumber
    }

    const getPrevCompletedTasksNumber = () => {
        const todosCopy = {
            ...todos
        }
        return todosCopy.credits.completedTasksCredits
    }

    const setAddCompletedTasks = (completedTasksNumber) => {
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
        const todo = newTodos.projects[getProjectArrayNumber()].tasks.find((todo) => todo.id === id);
        todo.isCompleted = !todo.isCompleted;
        setTodos(newTodos);

    }

    const handleTodoAdd = () => {
        // console.log("todos inside handleTodoAdd ----------------->", todos);
        const task = todoTaskRef.current.value;
        if (task === '') return;

        setTodos((prevTodos) => {
            const updatedTodos = {
                ...prevTodos
            };
            const newTasks = [...updatedTodos.projects[getProjectArrayNumber()].tasks, {id: uuidv4(), task, isCompleted: false}];
            updatedTodos.projects[getProjectArrayNumber()].tasks = newTasks;
            return updatedTodos
        })

        todoTaskRef.current.value = null;
    }

    const handleClearAll = () => {
        const projectArrayNumber = getProjectArrayNumber();
        const updatedTodos = {
            ...todos
        };
        const incompletedTodos = updatedTodos.projects[projectArrayNumber].tasks.filter((todo) => !todo.isCompleted);
        const completedTodos = (updatedTodos.projects[projectArrayNumber].tasks.filter((todo) => todo.isCompleted)).length;
        updatedTodos.projects[projectArrayNumber].tasks = incompletedTodos;
        setAddCompletedTasks(completedTodos);
        setTodos(updatedTodos);
    }

    const thisProjectTodosRef = () => {
        return todos.projects[getProjectArrayNumber()].tasks
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleTodoAdd();
        }
      }

    return (
        <Fragment>
            <div>
                <InitialMessage todos={thisProjectTodosRef()} getPrevCompletedTasksNumber={getPrevCompletedTasksNumber}/>
            </div>
            <TodoList todos={thisProjectTodosRef()} toggleTodo={toggleTodo}/>
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