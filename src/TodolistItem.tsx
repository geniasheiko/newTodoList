import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { FilterValuesType, TaskType, TodoList } from "./App"
import { AddItemForm } from "./components/addItemForm/AddItemForm"
import { EditableSpan } from "./components/editableSpan/EditableSpan"
import { Checkbox, IconButton, List, ListItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import {Button}  from "@mui/material"
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from './TodoListItem.styles'

type TodoListItemPropsTitle = {
  id: string
  todolist: TodoList
  tasks: Array<TaskType>
  deleteTask: (todoListId: string, taskId: string) => void
  changeFilter: (filter: FilterValuesType, todoListId: string) => void
  addTask: (todoListId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  deleteTodoList: (todolistId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, newValue:string) => void
  changeTododListTitle:(id:string, newTitle:string)=>void
}

export const TodolistItem = (props: TodoListItemPropsTitle) => {
  
  const changeFilterHandler = (filter: FilterValuesType, todoListId: string) => {
    props.changeFilter(filter, todoListId)
  }
  const changeTaskStatusHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
    let newStatusValue = event.currentTarget.checked
    props.changeTaskStatus(props.id, taskId, newStatusValue)
  }
 const changeTitleHandler = (taskId: string, newValue: string) => {
  props.changeTaskTitle(props.id, taskId, newValue)
 }
 const changeTodoListTitle = (newTitle:string) => {
   props.changeTododListTitle(props.id, newTitle)
 }
  const deleteTaskHandler = (todoListId: string, taskId: string) => {
    props.deleteTask(todoListId, taskId)
  }
  const deleteTodoListHandler = () => {
    props.deleteTodoList(props.id);
  }
  const addTask = (title: string) => {
    props.addTask(props.id, title)
  }
 
 return (
    <div className={'container'}>
      <div className={'addNewTodoList'}>
      <h3><EditableSpan title={props.todolist.title}
      onChange={changeTodoListTitle}/></h3>
      <IconButton onClick={deleteTodoListHandler}>
        <DeleteIcon />
     </IconButton>
      </div>
      <div>
    <AddItemForm addItem={addTask} />
    </div>
      <List>
        {props.tasks.map(task =>
          <ListItem key={task.id}
          sx={getListItemSx(task.isDone)}>
            <div>
            <Checkbox
              checked={task.isDone}
              onChange={(event) => changeTaskStatusHandler(task.id, event)}/>
           <EditableSpan title={task.title} isDone={task.isDone}
           onChange={(newValue)=>changeTitleHandler(task.id, newValue)} />
           </div>
            <IconButton
              onClick={() => deleteTaskHandler(props.id, task.id)}>
                <DeleteIcon />
                </IconButton>
          </ListItem>)}
      </List>
      <Box sx={containerSx}>
        <Button
          variant={props.todolist.filter === 'all' ? "outlined" : "text"}
         color={'inherit'}
          onClick={() => (changeFilterHandler("all", props.id))}>
             All
        </Button>
        <Button
          variant={props.todolist.filter === 'active' ? "outlined" : "text"}
          color={'primary'} onClick={() => (changeFilterHandler("active", props.id))}>
             Active
            </Button>
        <Button
          variant={props.todolist.filter === 'completed' ? "outlined" : "text"}
          color={'secondary'} 
          onClick={() => (changeFilterHandler("completed", props.id))}>
            Completed
            </Button>
      </Box>
    </div>
  )
}