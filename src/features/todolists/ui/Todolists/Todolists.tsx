import Paper from '@mui/material/Paper'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { Grid2 } from '@mui/material'
import { selectTodolists } from '../../model/todolists-selectors'
import { TodolistItem } from './TodolistItem/TodolistItem'


export const Todolists = () => {
    const todoLists = useAppSelector(selectTodolists)
    
    return (
        <>
            {todoLists.map(todolist => (
                 <Grid2 key={todolist.id}>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                            <TodolistItem todolist={todolist}/>
                </Paper>
                    </Grid2>
                
            ))}
        </>
    )
}