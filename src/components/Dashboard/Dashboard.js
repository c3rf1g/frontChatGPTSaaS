import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import LoginForm from '../Login/LoginForm.js';
import BotList from './BotComponents/BotList.js';
import NavBar from "../NavBar/NavBar.js";
import "./Dashboard.css";
const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
    const history = useHistory();

    if (!isLoggedIn) {
        history.push('/');
    }

    console.log(localStorage.getItem('accessToken'));

    const handleLogout = () => {
        // Clear access token from local storage
        localStorage.removeItem('accessToken');
        // Set isLoggedIn to false to trigger redirect to login page
        setIsLoggedIn(false);
    };

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="dashboard-container">
            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <BotList  />
        </div>
    );
};

export default Dashboard;
