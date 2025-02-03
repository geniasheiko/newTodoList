import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "../../Button"

export type AddItemFormPropsType = {
  addItem: (newTaskTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)
 
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  };
  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === 'Enter' && newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
        setNewTaskTitle('');
      }
      }
    
  const addTask = () => {
   // debugger
    if (newTaskTitle.trim() !== "") {
          props.addItem (newTaskTitle.trim());
          setNewTaskTitle("");
          setError(null);
        } else {
          setError("Title is required");
        }
      }
      return <div>
        <input
          value={newTaskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
          className={error ? "error" : ""}
        />
        <Button
          title="+"
          onClick={addTask}
        />
        {error && <div className="error-message">{error}</div>}
      </div>
     }