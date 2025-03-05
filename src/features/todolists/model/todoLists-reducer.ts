import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"


const initialState: TodoList[] = []
export type FilterValuesType = "all" | "completed" | "active";
export type TodoList = {
  id: string
  title: string
  filter: FilterValuesType
}

export type DeleteTodoListAction = ReturnType<typeof deleteTodoListAC>
export type CreateTodoListAction = ReturnType<typeof createTodoListAC>

export const deleteTodoListAC = createAction<{id: string}>('todoLists/deleteTodoList')
export const createTodoListAC = createAction('todoLists/createTodoList', (title: string) => {
  return {payload: {title, id: nanoid()}}
})
export const changeTodoListTitleAC = createAction<{ id: string; title: string }>('todoLists/changeTodoListTitle')
export const changeTodoListFilterAC = createAction<{ id: string; filter: FilterValuesType }>("todoLists/changeTodoListFilter");

export const todoListsReducer = createReducer(initialState, builder => {
  builder
  .addCase(deleteTodoListAC, (state, action)=> {
    const index = state.findIndex(todoList => todoList.id === action.payload.id)
    if (index !== -1) {
      state.splice(index, 1)
  }
})
.addCase(createTodoListAC, (state, action) => {
  state.push({...action.payload, filter: 'all'})
})   
.addCase(changeTodoListTitleAC, (state, action) => {
  const index = state.findIndex(todoList => todoList.id === action.payload.id)
  if(index !== -1) {
    state[index].title = action.payload.title
  }
})
.addCase(changeTodoListFilterAC, (state, action) => {
  const todoList = state.find(todoList => todoList.id === action.payload.id)
  if(todoList) {
    todoList.filter = action.payload.filter
  }
})
})
  

  

