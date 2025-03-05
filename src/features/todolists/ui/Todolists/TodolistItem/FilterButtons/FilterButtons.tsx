import { Box, Button } from "@mui/material"
import { changeTodoListFilterAC, FilterValuesType, TodoList } from "../../../../model/todoLists-reducer"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { containerSx } from "../TodoListItem.styles"

type Props = {
    todolist: TodoList
  }
   
  export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist
    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC({ id, filter }));
      }
    return (
        <Box sx={containerSx}>
        <Button
          variant={todolist.filter === 'all' ? "outlined" : "text"}
         color={'inherit'}
          onClick={() => changeFilter("all")}>
             All
        </Button>
        <Button
          variant={todolist.filter === 'active' ? "outlined" : "text"}
          color={'primary'} onClick={() => changeFilter("active")}>
             Active
            </Button>
        <Button
          variant={todolist.filter === 'completed' ? "outlined" : "text"}
          color={'secondary'} 
          onClick={() => changeFilter("completed")}>
            Completed
            </Button>
      </Box>
    )
  }