type EditableSpanPropsType = {
 title: string
}

export const EditableSpan = ({title}:EditableSpanPropsType) => {
return  <span className={task.isDone ? "task-done" : "task"}>
              {title}</span>
}