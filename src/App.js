import React, { useState } from "react";
import TaskSection from "./components/task-section";
import EnterArea from "./components/enterArea";
import AddButton from "./components/addButton";
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
            <EnterArea 
                handleSubmit={handleSubmit}
                wrap="enter-section-name-wrap"
                handleChange={handleChange}
                text="Add List"
                placeholder="Enter list title..."
                cancel={cancelAddSection}
            />

    const addAnotherListBtn = 
            <AddButton 
                addElement={addSection}
                text="Add another list"
                addClassName="add-list"    
            />

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
            <div className="board-wrapper">
                <div className="board-canvas">
                    {sectionList}
                    <div className="mx-1">
                        {enterMode ? enterSectionName : addAnotherListBtn}
                    </div>
                </div>
            </div>
        )
}

export default App;
