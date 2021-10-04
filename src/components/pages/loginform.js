import React, { useState }  from "react";


function LoginForm() {
    const uri = 'http://localhost:8080/login'
    const [userName, setUserName] = useState("");

    const handleChange = (e) => {
        setUserName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(uri, {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify( {username: userName })
        })
        .then(res => {
            console.log(res);
            res.json()
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        })

        setUserName("")
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column vh-100 bg-light">
                <div className="title">small tasks</div>
                <div className="log-form">
                    <h2>login to your account</h2>
                    <form className="d-flex flex-column align-items-end" onSubmit={handleSubmit}> 
                        <div className="w-100">
                            <input type="text" title="username" placeholder="username" maxLength="255" className="w-100" onChange={handleChange} value={userName}/>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="btn btn-outline-info">login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm;