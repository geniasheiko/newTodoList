import { createTodoListAC } from '@/features/todolists/model/todoLists-reducer'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import { AddItemForm } from '@/common/components/addItemForm/AddItemForm'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists'


export const Main = () => {
  const dispatch = useAppDispatch()
  const addTodoList = (title: string) => {
    dispatch(createTodoListAC(title))

  }
  return (
    <Container maxWidth={'lg'}>
      <Grid container sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
