import React, { useState } from "react";
import TaskSection from "./components/task-section";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTimes } from "react-icons/fa"
import { nanoid } from "nanoid";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App(props) {
    const [sections, setSections] = useState(props.sections);
    const [sectionName, setSectionName] = useState("");
    const [canBeInput, setCanBeInput] = useState(false);

    const addSection = () => {
        setCanBeInput(true);
    }

    const canselAddSection = (e) => {
        e.preventDefault()
        setCanBeInput(false)
    }

    const handleChange = (e) => {
        setSectionName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sectionName.length === 0) return ;
        const newSections = { id: `section-${nanoid()}`, name: sectionName };
        setSections([...sections, newSections])
        setCanBeInput(false)
        setSectionName("")
    }

    const deleteSection = (id) => {
        const remainSections = sections.filter(section => (id !== section.id));
        setSections(remainSections);
    }


    const enterSectionName = 
        <div className="bg-white enter-section-name mx-2">
            <form onSubmit={handleSubmit}>
                <input className="m-1" type="text" autoFocus={true} placeholder="Enter list title…" maxLength="30" onChange={handleChange} />
                <div className="add-section">
                    <button className="btn btn-primary add-list-btn m-1" type="submit">Add List</button>
                    <button className="m-1 btn-times" onClick={canselAddSection}><FaTimes/></button>
                </div>
            </form>
        </div>

    const addAnoterList = 
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
        />
    ))

    return (
        <>
        <div className="board-wrapper">
            <div className="mt-3 board-canvas">
                {sectionList}
                <div className="mx-1">
                    {canBeInput ? enterSectionName : addAnoterList}
                </div>
            </div>
        </div>
        </>
    )
}

export default App;
