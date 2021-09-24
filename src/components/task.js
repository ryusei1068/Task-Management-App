// text area リサイズ　https://into-the-program.com/javascript-textarea-auto-adjusts-height/
// https://qiita.com/y0o0suke/items/2402af42728131a01dc6

import React from "react";


function Task(props) {
    return (
        <>
            <div className="card-body">
                <div className="">
                    <textarea name="" id="" defaultValue="text" placeholder="task" className="w-100 task-name"></textarea>
                </div>                          
            </div>
        </>
    )
}


export default Task;
