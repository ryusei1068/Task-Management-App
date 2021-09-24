import React from "react";
import reactDom from "react-dom";
import App from "./App"


const sections = [];

reactDom.render(
    <App  sections={sections}/>,
    document.getElementById("root")
)
