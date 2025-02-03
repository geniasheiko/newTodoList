import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { FilterValuesType, TaskType, TodoList } from "./App"
import { Button } from "./Button"
import { AddItemForm } from "./components/addItemForm/AddItemForm"
import { EditableSpan } from "./components/editableSpan/EditableSpan"

type TodoListItemPropsTitle = {
  id: string
  todolist: TodoList
  tasks: Array<TaskType>
  deleteTask: (todoListId: string, taskId: string) => void
  changeFilter: (filter: FilterValuesType, todoListId: string) => void
  addTask: (todoListId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  deleteTodoList: (todolistId: string) => void
}

export const TodolistItem = (props: TodoListItemPropsTitle) => {
  
  const changeFilterHandler = (filter: FilterValuesType, todoListId: string) => {
    props.changeFilter(filter, todoListId)
  }
  const changeTaskStatusHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
    let newStatusValue = event.currentTarget.checked
    props.changeTaskStatus(props.id, taskId, newStatusValue)
  }
 
  let deleteTaskHandler = (todoListId: string, taskId: string) => {
    props.deleteTask(todoListId, taskId)
  }
  const deleteTodoListHandler = () => {
    props.deleteTodoList(props.id);
  }
  const addTask = (title: string) => {
    //debugger
    props.addTask(props.id, title)
  }
 
 return (
    <div className={'container'}>
      <div className={'addNewTodoList'}>
      <h3>{props.todolist.title}</h3>
      <Button title={'x'} onClick={deleteTodoListHandler} />
      </div>
      <div>
    <AddItemForm addItem={addTask} />
    
      </div>
      <ul>
        {props.tasks.map(task =>
          <li key={task.id}>
            <input type="checkbox"
              checked={task.isDone}
              onChange={(event) => changeTaskStatusHandler(task.id, event)}></input>
            <span className={task.isDone ? "task-done" : "task"}>
              {task.title}</span>
            <Button
              title="x"
              onClick={() => deleteTaskHandler(props.id, task.id)} />
          </li>)}
      </ul>
      <div>
        <Button
          className={props.todolist.filter === 'all' ? "filtreBtn-active" : ""}
          title={'All'}
          onClick={() => (changeFilterHandler("all", props.id))} />
        <Button
          className={props.todolist.filter === 'active' ? "filtreBtn-active" : ""}
          title={'Active'} onClick={() => (changeFilterHandler("active", props.id))} />
        <Button
          className={props.todolist.filter === 'completed' ? "filtreBtn-active" : ""}
          title={'Completed'} onClick={() => (changeFilterHandler("completed", props.id))} />
      </div>
    </div>
  )
}