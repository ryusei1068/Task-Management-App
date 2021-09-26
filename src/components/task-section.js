import React, { useState } from "react";
import Task from "./task";
import EnterArea from "./enterArea";
import AddButton from "./addButton";
import { nanoid } from "nanoid";
import TextareaAutosize from 'react-textarea-autosize';
import { VscClose } from "react-icons/vsc"


function TaskSection(props) {
    const [tasks, setTasks] = useState([]);
    const [isDisAbled, setDisAbled] = useState(true);
    const [taskName, setTaskName] = useState("");
    const [inActive, setInActive] = useState(false);


    const keyPress = (e) => {
        if (e.which === 13) {
            setDisAbled(true)
        }
    }

    const enable = () => {
        setDisAbled(false);
    }

    const cancelAdd = (e) => {
        e.preventDefault();
        setInActive(false)
    }

    const addCard = () => {
        setInActive(true);
    }

    const handleChange = (e) => {
        setTaskName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.length === 0) return ;
        const newTask = { id: `task-${nanoid()}`, name: taskName};
        setTasks([...tasks, newTask])
        setInActive(false)
        setTaskName("");
    }

    const deleteTask = (id) => {
        const remainTasks = tasks.filter(task => id !== task.id);
        setTasks(remainTasks)
    }

    const taskList = tasks
    .map(task => (
        <Task
            id={task.id}
            key={task.id}
            name={task.name}
            deleteTask={deleteTask}
        />
    ))


    const enterTaskName = 
            <EnterArea 
                handleSubmit={handleSubmit}
                wrap="enter-task-name m-3"
                handleChange={handleChange}
                text="Add Task"
                placeholder="Enter task name..."
                cancel={cancelAdd}
            />

    const addTaskBtn = 
            <AddButton 
                addElement={addCard}
                text="Add Card"
            />

    const sectionName =
            <div 
                className="pt-3 sectionName-wrap" 
                onMouseOver={enable}>
                    <TextareaAutosize 
                        className="section-title w-100" 
                        defaultValue={props.name} 
                        onKeyPress={(e) => keyPress(e)} 
                        disabled={isDisAbled}
                    />
                <div 
                    className="trash-box-icon" 
                    onClick={() => props.deleteSection(props.id)}>
                        <VscClose/>
                </div>
            </div>

    return  (
            <div className="vh-100">
                <div className="mx-2 list-wrapper">
                    <div className="mx-3">
                        {sectionName}
                    </div>
                    <div className="task-cards">
                        {taskList}
                    </div>
                        {!inActive ? addTaskBtn : enterTaskName}
                </div>
            </div>
        )
}

export default TaskSection;
