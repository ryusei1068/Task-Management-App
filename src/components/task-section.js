import React, { useState } from "react";
import Task from "./task";
import { AiOutlinePlus } from "react-icons/ai"
import { nanoid } from "nanoid";
import TextareaAutosize from 'react-textarea-autosize';


function TaskSection(props) {
    const [tasks, setTask] = useState([]);
    const [isDisAbled, setDisAbled] = useState(true);

    const addTask = () => {
        const newTask = { id: `task-${nanoid()}` };
        setTask([...tasks, newTask])
    }

    const keyPress = (e) => {
        if (e.which === 13) {
            setDisAbled(true)
        }
    }

    const enable = () => {
        setDisAbled(false);
    }

    const taskList = tasks
    .map(task => (
        <Task
            id={task.id}
            key={task.id}
        />
    ))


    const sectionName =
        <> 
            <div className="pt-3 sectionName-wrap"  onClick={enable}>
                <TextareaAutosize className="section-title w-100" defaultValue={props.name} onKeyPress={(e) => keyPress(e)} disabled={isDisAbled}/>
            </div>
        </>

    return  (
        <>
            <div className="vh-100">
                <div className="mx-2 list-wrapper">
                    <div className="mx-3">
                        {sectionName}
                    </div>
                    <div className="card">
                        {taskList}
                    </div>
                    <button className="btn add-task mt-1" onClick={addTask}><AiOutlinePlus/> Add a Card</button>
                </div>
            </div>
        </>
    )
}

export default TaskSection;
