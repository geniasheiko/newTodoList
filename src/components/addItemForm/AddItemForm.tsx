import { Button, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
//import { Button } from "../../Button"

export type AddItemFormPropsType = {
  addItem: (newTaskTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [newTaskItem, setNewTaskItem] = useState("")
  const [error, setError] = useState<string | null>(null)

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskItem(event.currentTarget.value)
  };
  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === 'Enter' && newTaskItem.trim() !== "") {
      props.addItem(newTaskItem.trim());
      setNewTaskItem('');
    }
  }

  const addTask = () => {
    if (newTaskItem.trim() !== "") {
      props.addItem(newTaskItem.trim());
      setNewTaskItem("");
      setError(null);
    } else {
      setError("Title is required");
    }
  }
  return <div>
    <TextField
      label={'Enter a title'}
      variant={'outlined'}
      size={'small'}
      error={!!error}
      helperText={error}
      value={newTaskItem}
      onChange={changeItemTitleHandler}
      onKeyDown={createItemOnEnterHandler}
    />
    <IconButton color={'primary'}
      onClick={addTask}>
        <AddBoxIcon />
        </IconButton>
    {error && <div className="error-message">{error}</div>}
  </div>
}