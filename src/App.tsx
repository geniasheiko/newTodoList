import { useState } from 'react'
import './App.css'
import {TodolistItem} from './TodolistItem'
import {v1} from 'uuid'
import { AddItemForm } from './components/addItemForm/AddItemForm'
 
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksStateType = {
  [key:string]: Array<TaskType>
}
export type FilterValuesType = "all" | "completed" | "active";
export type TodoList = {
  id: string
  title: string
  filter: FilterValuesType
}
export const App = () => {
  const todoListId1 = v1()
  const todoListId2 = v1()
   // state for TodoLists
  const [todoLists, setTodoLists] = useState<TodoList[]>([
    {id:todoListId1, title:"What to learn", filter: "all"},
    {id:todoListId2, title:"What to buy", filter: "all"},
  ])
    // state for tasks
  const [tasks, setTasks] = useState<TasksStateType>({
   [todoListId1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
],
[todoListId2]: [
    { id: v1(), title: 'Rest API', isDone: true },
    { id: v1(), title: 'GraphQL', isDone: false },
],
})

  let deleteTask = (todoListId: string, taskId: string) =>{
    const todoListTasks = {...tasks, [todoListId]: tasks[todoListId].filter(t =>t.id !==taskId)}
    setTasks(todoListTasks)
  }
  let addTask = (todoListId:string, title:string) => {
    let newTask = {id:v1(), title:title, isDone:false};
    let newTasks={...tasks, [todoListId]: [newTask, ...tasks[todoListId]]};
    setTasks(newTasks); 
   }
  const changeFilter = (filter: FilterValuesType, todoListId: string) => {
     let todoList = todoLists.find(tl => tl.id ===todoListId );
   if(todoList) {
    todoList.filter = filter;
    setTodoLists([...todoLists]);                                       
   }
  }

 const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
  let newTasks = {
    ...tasks,
    [todolistId]: tasks[todolistId].map(task => task.id === taskId ?{ ...task, isDone } : task),
  }
  setTasks(newTasks)
 }
 const deleteTodoList = (todolistId: string) => {                  
  setTodoLists(todoLists.filter(todolist => todolist.id !== todolistId))
 delete tasks[todolistId]
 setTasks({...tasks})
}
const addTodoList = (title:string)=> {
  let todoList: TodoList = {
    id: v1(),
    filter: 'all',
    title: title,
  };
  setTodoLists([todoList, ...todoLists]);
  setTasks({
    ...tasks,
    [todoList.id]:[]
  })
}

    return (
      <div className="app">
      <AddItemForm addItem={addTodoList}  />
        {todoLists.map(todolist => {
            const todoListTasks = tasks[todolist.id]
            let filteredTasks = todoListTasks
            if (todolist.filter === 'active') {
              filteredTasks = todoListTasks.filter(task => !task.isDone )
            }
            if (todolist.filter === 'completed') {
              filteredTasks = todoListTasks.filter(task => task.isDone)
           }
          
          return (
        <TodolistItem key={todolist.id}
          id={todolist.id}  
          todolist={todolist}
          tasks={filteredTasks} 
          deleteTask={deleteTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}
          deleteTodoList={deleteTodoList}
          />
          )
        })}
      </div>
  )
}
 
