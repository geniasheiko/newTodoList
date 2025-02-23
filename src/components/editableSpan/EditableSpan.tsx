import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

export type EditableSpanPropsType = {
 title: string
 isDone?: boolean 
 onChange: (newValue:string) => void
}

export const EditableSpan = (props:EditableSpanPropsType) => {
    let[editMode, setEditMode] = useState(false);
    let[title, setTitle] = useState("");
    
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>)=>setTitle(e.currentTarget.value)

    return editMode
  ? <TextField 
  variant={'outlined'}
  size={'small'}
  value={title} onChange={onChangeTitleHandler}
  onBlur={activateViewMode} autoFocus/>
  : <span className={props.isDone ? "task-done" : "task"}
  onDoubleClick={activateEditMode}>
              {props.title}</span>
}