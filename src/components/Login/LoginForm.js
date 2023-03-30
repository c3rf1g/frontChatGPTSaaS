import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {API_DOMAIN} from "../../index.js";
import "./Login.css"
import CircularLoader from "../../utils/Loader.js";
const LoginForm = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        if (isRegistering) {
            const response = await fetch(API_DOMAIN + '/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            console.log(data)
            // Store access token in local storage
            if (data.data) {
                localStorage.setItem('accessToken', data.data.accessToken);
                setIsLoggedIn(true); // set user as logged in
            } else {
                alert(data.error)
            }

        } else {
            const response = await fetch(API_DOMAIN + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            // Store access token in local storage
            if (data.data) {
                localStorage.setItem('accessToken', data.data.accessToken);
                setIsLoggedIn(true); // set user as logged in
                history.push('/dashboard');
            } else {
                alert(data.error)
            }
        }
        setLoading(false)
    };

    const toggleForm = () => {
        setIsRegistering((prevIsRegistering) => !prevIsRegistering);
    };
    const font = {
        fontFamily: "Montserrat, bold"
    }
    return (
        <div className="login-wrapper" style={font}>
            {loading ? <CircularLoader /> : null}
            <div className="greenyellow-component">
                <h1 className="rainbow-text">MyBotGPT</h1>
            </div>

            <div className="login-form static-component">
                <h2 >{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: "left" }}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div style={{ textAlign: "left" }}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                </form>
                <a href="#" style={{textDecoration: "none"}} onClick={toggleForm}>
                    {isRegistering
                        ? 'Already have an account? Login'
                        : 'Need to register? Sign up'}
                </a>
            </div>

        </div>
    );
};

export default LoginForm;
