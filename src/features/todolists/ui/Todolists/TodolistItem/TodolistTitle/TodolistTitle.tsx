import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './TodolistTitle.module.css'
import { changeTodoListTitleAC, deleteTodoListAC, TodoList } from "@/features/todolists/model/todoLists-reducer"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { EditableSpan } from "@/common/components/editableSpan/EditableSpan"
type Props = {
    todolist: TodoList
  }
  
  export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist
  
    const dispatch = useAppDispatch()
  
    const deleteTodolist = () => {
      dispatch(deleteTodoListAC({id}))
    }
  
    const changeTodolistTitle = (title: string) => {
      dispatch(changeTodoListTitleAC({id, title}))
    }
  
    return (
        <div className={styles.container}>
          <h3>
            <EditableSpan title={title} onChange={changeTodolistTitle}/>
          </h3>
          <IconButton onClick={deleteTodolist}>
            <DeleteIcon/>
          </IconButton>
        </div>
    )
  }
  