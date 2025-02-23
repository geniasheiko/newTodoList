import {v1} from 'uuid'
import { beforeEach, expect, test } from 'vitest'
import type {TodoList} from '../App'
import {deleteTodoListAC, todoListsReducer, createTodoListAC, ChangeTodoListTitleAC, changeTodoListFilterAC} from './todoLists-reducer'

let todoListId1: string
let todoListId2: string
let startState: TodoList[] = []
 
beforeEach(() => {
  todoListId1 = v1()
  todoListId2 = v1()
  startState = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'},
  ]
})
test('correct todolist should be deleted', () => {
      const endState = todoListsReducer(startState, deleteTodoListAC(todoListId1))
       // 3. Проверка
      expect(endState.length).toBe(1)
      expect(endState[0].id).toBe(todoListId2)
})

// test('correct todolist should be created', () => {
//   const title = 'New todolist'
//   const endState = todoListsReducer(startState, createTodoListAC(id: string, title: string)
 
//   expect(endState.length).toBe(3)
//   expect(endState[2].title).toBe(title)
// })

test('correct todolist should change its title', () => {
  const title = 'New title'
  const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todoListId2, title))
 
  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
  const filter = 'completed'
  const endState = todoListsReducer(startState, changeTodoListFilterAC(todoListId2, filter));
 
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(filter)
})