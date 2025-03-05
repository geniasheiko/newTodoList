import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { createTaskAC } from "@/features/todolists/model/tasks-reducer"
import { TodoList } from "@/features/todolists/model/todoLists-reducer"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { AddItemForm } from "@/common/components/addItemForm/AddItemForm"
import { Tasks } from "./Tasks/Tasks"
import { FilterButtons } from "./FilterButtons/FilterButtons"


type TodoListItemPropsTitle = {
  todolist: TodoList
}

export const TodolistItem = ({ todolist }: TodoListItemPropsTitle) => {
  const dispatch = useAppDispatch()
const addTask = (title: string) => {
    dispatch(createTaskAC({ todoListId: todolist.id, title }))
    console.log("task")
  }
  
return (
 <div>
  <TodolistTitle todolist={todolist}/>
    <AddItemForm addItem={addTask} />
    <Tasks todolist={todolist}/>
    <FilterButtons todolist={todolist}/>
 </div>
  )
}
      
           