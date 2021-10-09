import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TaskSection from "./components/task-section";
import EnterArea from "./components/enterArea";
import AddButton from "./components/addButton";
import { nanoid } from "nanoid";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import TopPage from "./components/pages/toppage";
import LoginForm from "./components/pages/loginform";
import SignUpForm from "./components/pages/signupform";


function App(props) {
    const [sections, setSections] = useState(props.sections);
    const [sectionName, setSectionName] = useState("");
    const [enableToEnter, setEnableToEnter] = useState(false);

    const addSection = () => {
        setEnableToEnter(true);
    }

    const cancelAdd = (e) => {
        e.preventDefault()
        setEnableToEnter(false)
    }

    const handleChange = (e) => {
        setSectionName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sectionName.length === 0) return ;
        const newSection = { id: `section-${nanoid()}`, name: sectionName };
        setSections([...sections, newSection])
        setEnableToEnter(false)
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
                cancel={cancelAdd}
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
            deleteSection={deleteSection}
            className="section"
        />
    ))

    return (
            // <div className="board-wrapper">
            //     <div className="board-canvas">
            //         {sectionList}
            //         <div className="mx-1">
            //             {enableToEnter ? enterSectionName : addAnotherListBtn}
            //         </div>
            //     </div>
            // </div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <TopPage/>
                    </Route>
                    <Route path="/login">
                        <LoginForm/>
                    </Route>
                    <Route path="/signup">
                        <SignUpForm/>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
}

export default App;
