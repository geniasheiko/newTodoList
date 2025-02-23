import type { FilterValuesType, TodoList } from "../App"
import {v1} from 'uuid'



const initialState: TodoList[] = []
type Actions = DeleteTodoListAction | CreateTodoListAction | ChangeTodoListTitleAction | changeTodoListFilterAction

export const todoListsReducer = (state: TodoList[] = initialState, action: Actions):TodoList[] => {
    switch (action.type) {
        case 'delete_todoList': {
            return state.filter(todoList => todoList.id !== action.payload.id) 
        }
        case 'create_todoList': {
          const newTodoList: TodoList = {id: action.payload.id,
            title: action.payload.title, 
            filter: 'all'}
            return [...state, newTodoList]
        }
        case 'change_TodoList_Title': {
        return state.map((todoList) => todoList.id ===action.payload.id ?
        {...todoList, title: action.payload.title}
        : todoList
        );
        }
        case 'change_TodoList_Filter': 
        return state.map((todoList)=> todoList.id === action.payload.id ?
        {... todoList, filter: action.payload.filter as FilterValuesType}
      : todoList
    );
        
        default: 
        return state;
    }
  }
  
//УДАЛЕНИЕ
export type DeleteTodoListAction = {
    type: 'delete_todoList'
    payload: {
      id: string
    }
  }
  export const deleteTodoListAC = (id:string) => {
    return {type: 'delete_todoList', payload: {id}} as const
  }
  export type DeleteTodolistAction = ReturnType<typeof deleteTodoListAC>

//СОЗДАНИЕ
export type CreateTodoListAction = {
type: 'create_todoList'
payload: {
  id: string
  title: string
}
}
export const createTodoListAC = (id: string, title: string) => {
  return {type:'create_todoList', payload:{id, title}} as const
 }
 //export type CreateTodoListAction = ReturnType<typeof createTodoListAC>;
//ИЗМЕНЕНИЕ
export type ChangeTodoListTitleAction = {
  type: 'change_TodoList_Title'
  payload: {
    id: string
    title: string
  }
}
export const ChangeTodoListTitleAC = (id: string, title: string) => {
  return {type: 'change_TodoList_Title', payload:{id,
    title}} as const 
  }
 // export type ChangeTodoListTitleAction = ReturnType<typeof changeTodoListTitleAC>;
  
  
//ИЗМЕНЕНИЕ ФИЛЬТРА
 export type  changeTodoListFilterAction = {
  type: 'change_TodoList_Filter'
  payload: {
    id: string
    filter: FilterValuesType
  }
 }
 export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
  return {type: 'change_TodoList_Filter', payload:{id, filter
  }} as const 
 }


