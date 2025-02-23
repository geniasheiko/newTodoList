import { v1 } from 'uuid'
import type {TasksStateType} from '../App'
import {DeleteTodoListAction, CreateTodoListAction} from './todoLists-reducer'

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type changeTaskStatusAction =  ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

const initialState: TasksStateType = {}

type Actions = DeleteTodoListAction | CreateTodoListAction | DeleteTaskAction | CreateTaskAction | changeTaskStatusAction | changeTaskTitleAction
export const tasksReducer = (state: TasksStateType = initialState, action: Actions): TasksStateType => {
  switch (action.type) {
    case 'delete_todoList': {
        const newTasks={...state}
        delete newTasks[action.payload.id]
      return newTasks
    }
    case 'create_todoList': 
        return {...state, [action.payload.id]: []
}
    case 'delete_task': {
        const {todoListId, taskId} = action.payload;
      return {
        ...state, 
        [todoListId]:state[todoListId].filter(t => t.id !==taskId)}
      }
      case 'create_task' : {
        const {todoListId, title} = action.payload
    const newTask={id: v1(), title, isDone: false};
    return {

        ...state,
        [todoListId]: [newTask, ...state[todoListId]],
    }
      }
      case 'change_Task_Status': {
        const {todolistId, taskId, isDone} = action.payload
       return {
            ...state,
            [todolistId]: state[todolistId].map(task => task.id === taskId ?{ ...task, isDone } : task),
          }
      }
      case 'change_Task_Title': {
        const {todolistId, taskId, title} = action.payload
       return{
            ...state,
            [todolistId]: state[todolistId].map(task => task.id === taskId ?{ ...task, title} : task),
          }
      }
    default:
      return state
  }
}
 
  
 export const deleteTaskAC = (payload:{todoListId:string, taskId:string}) => {
    return {type:'delete_task',
        payload
    } as const
 }

 export const createTaskAC =(payload:{todoListId:string, title:string}) => {
    return { type:'create_task',
        payload
    } as const
 }


 export const changeTaskStatusAC = (payload:{todolistId: string, taskId: string, isDone: boolean}) => {
    return {
        type:'change_Task_Status',
        payload
    } as const
 }
 
 export const changeTaskTitleAC = (payload:{todolistId: string, taskId: string, title: string}) => {
    return {
        type: 'change_Task_Title',
        payload
    } as const
 }