import React, { useState }  from "react";


function LoginForm() {
    const uri = 'http://localhost:8080/login'
    const [userName, setUserName] = useState("");

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const handleChange = (e) => {
        setUserName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(uri, {
            method: 'POST',
            body: JSON.stringify( {usename: userName })
        })
        .then(res => {
            console.log(res.json());
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column vh-100 bg-light">
                <div className="title">small tasks</div>
                <div className="log-form">
                    <h2>login to your account</h2>
                    <form className="d-flex flex-column align-items-end" onSubmit={handleSubmit}>
                        <div className="w-100">
                            <input type="text" title="username" placeholder="username" maxLength="255" className="w-100" onChange={handleChange}/>
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
