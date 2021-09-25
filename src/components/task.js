import React, { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { BsTrash } from 'react-icons/bs'

function Task(props) {
    const [editMode, setEditMode] = useState(true);

    const keyPress = (e) => {
        if (e.which === 13) {
            setEditMode(true)
        }
    }

    const enable = () => {
        setEditMode(false)
    }

    const upDateTaskName =
    <> 
        <TextareaAutosize 
            className="task-name" 
            defaultValue={props.name}
            onKeyPress={(e) => keyPress(e)} 
            disabled={editMode}
            onMouseOver={enable}
        />
    </>

    const editDetail = 
    <>
        <TextareaAutosize 
            className="task-detail" 
            defaultValue=""
            onKeyPress={(e) => keyPress(e)} 
            disabled={editMode}
            onMouseOver={enable}
        />
    </>
    
    return (
        <>
            <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    {upDateTaskName}
                    <div className="trash-box-icon" onClick={() => props.deleteTask(props.id)}>
                        <BsTrash />
                    </div>
                </div>
                <div className="toast-body">
                    <small style={{color: "gray"}}>detail</small>
                    {editDetail}
                </div>
            </div>
        </>
    )
}


export default Task;
