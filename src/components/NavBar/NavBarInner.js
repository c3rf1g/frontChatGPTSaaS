import React from 'react';
import './NavBar.module.css';

const NavBarInner = ({ isLoggedIn, handleLogout}) => {
    return (
        <div className="left-panel">
            <div className="company-name">MyBotGPT</div>
            <ul className="article-list">
                <li className="article-item">Dashboard</li>
                <li className="article-item">Profile </li>
                <li className="article-item">Billing</li>
            </ul>
            {isLoggedIn && (
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            )}
        </div>
    );
};

export default NavBarInner;
