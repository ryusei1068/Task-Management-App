import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { BsTrash } from 'react-icons/bs'

function Task(props) {
    
    return (
        <>
            <div className="card-body">
                <div className="d-flex align-items-end">
                    <TextareaAutosize className="task-name" defaultValue={props.name}/>
                    <div className="trash-box-icon" onClick={() => props.deleteTask(props.id)}>
                        <BsTrash />
                    </div>
                </div>                          
            </div>
        </>
    )
}


export default Task;
