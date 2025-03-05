import { RootState } from '@/app/store'
import { TodoList } from './todoLists-reducer'
 
export const selectTodolists = (state: RootState): TodoList[] => state.todolists