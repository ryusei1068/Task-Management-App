import React, { useState } from "react";
import TaskSection from "./components/task-section";
import { AiOutlinePlus } from "react-icons/ai";
import { VscClose } from "react-icons/vsc";
import { nanoid } from "nanoid";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App(props) {
    const [sections, setSections] = useState(props.sections);
    const [sectionName, setSectionName] = useState("");
    const [enterMode, setEnterMode] = useState(false);

    const addSection = () => {
        setEnterMode(true);
    }

    const cancelAddSection = (e) => {
        e.preventDefault()
        setEnterMode(false)
    }

    const handleChange = (e) => {
        setSectionName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sectionName.length === 0) return ;
        const newSection = { id: `section-${nanoid()}`, name: sectionName };
        setSections([...sections, newSection])
        setEnterMode(false)
        setSectionName("")
    }

    const deleteSection = (id) => {
        const remainingSections = sections.filter(section => (id !== section.id));
        setSections(remainingSections);
    }

    const enterSectionName = 
        <div className="enter-section-name-wrap mx-2">
            <form onSubmit={handleSubmit}>
                <input className="m-1" type="text" autoFocus={true} placeholder="Enter list title…" maxLength="500" onChange={handleChange} />
                <div className="add-section">
                    <button className="btn btn-primary add-list-btn m-1" type="submit">Add List</button>
                    <button className="btn-vscClose" onClick={cancelAddSection}><VscClose/></button>
                </div>
            </form>
        </div>

    const addAnotherListBtn = 
        <button className="btn add-list" onClick={addSection}>
            <AiOutlinePlus/> Add another list
        </button>

    const sectionList = sections
    .map(section => (
        <TaskSection
            id={section.id}
            key={section.id}
            name={section.name}
            section={section.name}
            deleteSection={deleteSection}
            draggable={true}
        />
    ))

    return (
        <>
            <div className="board-wrapper">
                <div className="board-canvas">
                    {sectionList}
                    <div className="mx-1">
                        {enterMode ? enterSectionName : addAnotherListBtn}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
