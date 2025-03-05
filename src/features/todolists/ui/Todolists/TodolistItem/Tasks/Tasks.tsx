import { useAppSelector } from "@/common/hooks/useAppSelector"
import { TaskType } from "@/features/todolists/model/tasks-reducer"
import { selectTasks } from "@/features/todolists/model/tasks-selector"
import { TodoList } from "@/features/todolists/model/todoLists-reducer"
import { List } from "@mui/material"
import { TaskItem } from "./TaskItem/TaskItem"

type Props = {
    todolist: TodoList
}

export const Tasks = ({ todolist }: Props) => {
    const { id, filter } = todolist
    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[id] || [];
    let filteredTasks:TaskType[] = todolistTasks;
    if (filter === "active") {
        filteredTasks = todolistTasks.filter(task => !task.isDone);
    }
    if (todolist.filter === "completed") {
        filteredTasks = todolistTasks.filter(task => task.isDone);
    }
    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => (
                        <TaskItem key={task.id} task={task} todoListId={id} />
                    ))}
                </List>
            )}
        </>
    )

}