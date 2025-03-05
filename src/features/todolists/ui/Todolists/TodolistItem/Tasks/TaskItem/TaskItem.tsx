import { ChangeEvent } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, TaskType } from "@/features/todolists/model/tasks-reducer"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { getListItemSx } from "./TaskItem.styles"
import { EditableSpan } from "@/common/components/editableSpan/EditableSpan"
import DeleteIcon from '@mui/icons-material/Delete'


type Props = {
    task: TaskType
    todoListId: string
}

export const TaskItem = ({ task, todoListId }: Props) => {
    const dispatch = useAppDispatch()
    const deleteTask = () => {
        dispatch(deleteTaskAC({ todoListId, taskId: task.id }))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({ todoListId, taskId: task.id, isDone: newStatusValue }))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({ todoListId, taskId: task.id, title }))
    }
    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
                <EditableSpan title={task.title} onChange={changeTaskTitle} />
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}
