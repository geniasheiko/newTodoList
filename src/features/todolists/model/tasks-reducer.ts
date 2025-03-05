import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import { createTodoListAC, deleteTodoListAC } from './todoLists-reducer'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

export const deleteTaskAC = createAction<{ todoListId: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction<{ todoListId: string, title: string }>('tasks/createTask')
export const changeTaskStatusAC = createAction<{ todoListId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{ todoListId: string, taskId: string, title: string }>('tasks/changeTaskTitle')

const initialState: TasksStateType = {}

export const tasksReducer = createReducer(initialState, builder => {
  builder
    .addCase(deleteTaskAC, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    })
    .addCase(createTaskAC, (state, action) => {
      const newTask: TaskType = { title: action.payload.title, isDone: false, id: nanoid() }
      state[action.payload.todoListId].unshift(newTask)
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todoListId].find(task => task.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todoListId].find(task => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    })
    .addCase(createTodoListAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(deleteTodoListAC, (state, action) => {
      delete state[action.payload.id]
    })
})






