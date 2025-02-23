import { useReducer, useState } from 'react'
import './App.css'
import {TodolistItem} from './TodolistItem'
import {v1} from 'uuid'
import { AddItemForm } from './components/addItemForm/AddItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {containerSx} from './TodoListItem.styles'
import {NavButton} from './NavButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { createTodoListAC, ChangeTodoListTitleAC, todoListsReducer } from './model/todoLists-reducer'
import {tasksReducer} from './model/tasks-reducer'
 
type ThemeMode = 'dark' | 'light' 

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
  //theme, style
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#ef6c00',
      },
    },
  })
   // state for TodoLists
  const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer,[
    {id:todoListId1, title:"What to learn", filter: "all"},
    {id:todoListId2, title:"What to buy", filter: "all"},
 ])
    // state for tasks
  const [tasks, dispatchToTasks] = useReducer(tasksReducer,
    {
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
const changeMode = () => {
  setThemeMode(themeMode === 'light' ? 'dark' : 'light')
}
//TodoList
const changeFilter = (filter: FilterValuesType, todoListId: string) => {
  dispatchToTodoLists({type: 'change_TodoList_Filter', payload: {id:todoListId, filter}})
}
const changeTodoListTitle = (id:string, title:string) => {
  dispatchToTodoLists(ChangeTodoListTitleAC(id, title))
}
const deleteTodoList = (todolistId: string) => {     
  dispatchToTodoLists({type: 'delete_todoList', payload:{id: todolistId}});
  dispatchToTasks({ type: 'delete_todoList', payload: { id: todolistId } });
}
const addTodoList = (title: string)=> {
  const newTodoListId = v1();
  dispatchToTodoLists(createTodoListAC(newTodoListId, title))
  
  dispatchToTasks({type:'create_task', payload:{todoListId:newTodoListId, title}})
  const nextTaskState: TasksStateType = {...tasks, [newTodoListId]: []}
}

//Task
const deleteTask = (todoListId: string, taskId: string) =>{
    const todoListTasks = {...tasks, [todoListId]: tasks[todoListId].filter(t =>t.id !==taskId)}
    dispatchToTasks({type:'delete_task', payload:{todoListId, taskId}})
  }
  const addTask = (todoListId:string, title:string) => {
    let newTask = {id:v1(), title:title, isDone:false};
    let newTasks={...tasks, [todoListId]: [newTask, ...tasks[todoListId]]};
    dispatchToTasks({type:'create_task', payload:{todoListId, title}})
   }
 
const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
  let newTasks = {
    ...tasks,
    [todolistId]: tasks[todolistId].map(task => task.id === taskId ?{ ...task, isDone } : task),
  }
  dispatchToTasks({type:'change_Task_Status', payload:{todolistId, taskId, isDone}})
 }
 
 const changeTaskTitle = (todolistId: string, taskId: string, newValue: string) => {
  let newTasks = {
    ...tasks,
    [todolistId]: tasks[todolistId].map(task => task.id === taskId ?{ ...task, title:newValue } : task),
  }
  dispatchToTasks({type:'change_Task_Title', payload:{todolistId, taskId, title:newValue}})
 }


    return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
        <AppBar position="static" sx={{ mb: '30px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <NavButton>Sign in</NavButton>
          <NavButton>Sign up</NavButton>
          <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
          <Switch color={'default'} onChange={changeMode} />
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth={'lg'}>
        <Grid container sx={{ mb: '30px' }}>
      <AddItemForm addItem={addTodoList}  />
      </Grid>
      <Grid container spacing={4}>
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
            <Grid key={todolist.id}>
              <Paper sx={{ p: '0 20px 20px 20px' }}>
        <TodolistItem key={todolist.id}
          id={todolist.id}  
          todolist={todolist}
          tasks={filteredTasks} 
          deleteTask={deleteTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTododListTitle={changeTodoListTitle}
          changeTaskStatus={changeTaskStatus}
          changeTaskTitle={changeTaskTitle}
          deleteTodoList={deleteTodoList}
          />
          </Paper>
          </Grid>
          )
        })}
         </Grid>
         </Container>
       </ThemeProvider>
  )
}

