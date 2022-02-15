# Existing functions

> The intenction of this file is to list all of the imports and functions used in this project.
---
## App.jsx
#### Imports
- React, {Fragment, useState, useRef, useEffect } from "react"
- { v4 as uuidv4 } from 'uuid'
- { TodoList } from "./components/TodoList"
- { InitialMessage } from "./components/InitialMessage"
---
#### Functions
- **getPrevCompletedTasksNumber()**: retuns the value stored in local storage of the previous completed tasks
- **setCompletedTasks( *completedTasksNumber* )**: adds the receiving number parameter to the actual number value of completed tasks and set it in local storage.
- **toggleTodo( *id* )**: toogles the boolean value of completed of any item in the array that fits with the received *id*.
- **handleTodoAdd()**: takes the reference of the input, extracts its value, and validates if it is empty to return, if not, it creates a new task object, and joins it to the array of tasks objects in the setTodos. Then it emptys the input value of the reference.
- **handleClearAll ()**: validate which objects in the array of tasks objects are completed, and makes a new list whit the ones incomplete to remain displayed. Calculates the number of cleared tasks in this action, and adds them to the complete tasks number using the function *setCompletedTasks()*.
- **_handleKeyDown( *e* )**: validates if the *.key* value of the received input keyboard event is equal to 'Enter', if so it executes the function *handleTodoAdd()*.
---
## InitialMessage.jsx
#### Imports
- React from 'react'
---
#### Functions
- **getMisingTodos()**: gets the number of the tasks that are not marked as completed.
- **textMessageValidation()**: returns a custom message, depending on the value of the executed *getMissingTodos()*.
---
## TodoList.jsx
#### Imports
- React from 'react'
- { TodoItem } from './TodoItem'
---
## TodoItem.jsx
#### Imports
- React from 'react'
---
#### Functions
- **handleTodoClick()**: executes the function *toggleTodo()* using the *id* of the current item.
----
# New Functions
> This is a proposal for new functions, since the plannification for expanding the functionalities in this project required many changes in the data structure, and many functionalities requires new functions.
> The idea is trying to keep as escalable as posible, for this, I will try to separate every functionality in multiple components, divided in multiple functions.
---
### General
- **getAllIncompletedTasks()**:
- **getAllCompletedTasks()**:
---
### Projects
- **isThisProjectStarted( *projectId* )**:
- **isThisProjectCompleted( *projectId* )**:
- **updateProjectName( *projectId*, *newName*  )**:
- **getProjectCompletedTasks( *projectId* )**:
- **getProjectIncompletedTasks( *projectId* )**:
- **createNewProject( *name*, *description*, *trophyStyle* )**:
- **updateProjectDescription ( *projectId*, *newDescription* )**:
- **getProjectCreationDate( *projectId* )**:
- **getProjectDueDate( *projectId* )**:
- **isProjectComplete( *projectId* )**:
- **getProjectLastCompleteDate( *projectId* )**:
- **getProjectLastRestoredDate( *projectId* )**:
---
### Tasks
- **createNewTask( *name*, *description*, *projectId* )**:
- **addTaskObjectToProject( *projectId*, *taskObject* )**:
- **removeTaskFromProject( *projectId*, *taskId* )**:
- **updateTaskName( *taskId*, *newName* )**:
- **updateTaskDescription( *taskId*, *newDescription* )**:
- **isThisTaskCompleted( *projectId*, *taskId* )**:
- **toogleTaskCompletedValue( *projectId*, *taskId* )**:
- **returnTaskObject( *projectId*, *taskId* )**:
- **reasignProjectToTask( *actualProjectId*, *targetProjectId* )**
- **createAndAddNewTag( *name*, *description*, *colorHex*, *taskId* )**:
- **addExistingTag( *projectId*, *taskId*, *tagId* )**:
- **removeTag( *projectId*, *taskId*, *tagId* )**:
---
### Tags
- **createNewTag( *name*, *description*, *colorHex* )**:
- **updateTagName( *tagId*, *newTagName* )**:
- **updateTagDescription( *tagId*, *newTagDescription* )**:
- **updateTagColorHex( *tagId*, *newColorHex* )**
- **getTagTasks( *tagId* )**:
- **getTagAllCompletedTasks( *tagId* )**:
- **getTagAllIncompletedTasks( *tagId* )**:
- **removeTag( *tagId* )**:
---
### Custom Phrases
- **getSelfRewardItems()**:
- **getSelfRewardRedeemedItems()**:
- **getSelfRewardNotRedeemedItems()**:
- createNewSelfRewardItem
- copy
- updateName
- updateDescription
- updateCost
- makeCopy
- updateImgSrc
- setImgSrc
