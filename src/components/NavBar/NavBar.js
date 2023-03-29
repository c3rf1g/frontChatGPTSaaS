import React, { useState } from 'react';
import './NavBar.css';
import NavBarInner from './NavBarInner.js';

const NavBar = ({ isLoggedIn, handleLogout }) => {
    const [showLeftPanel, setShowLeftPanel] = useState(false);

    const handleHamburgerClick = () => {
        setShowLeftPanel(!showLeftPanel);
    };

    return (
        <nav className="navbar">
            <div className="mobile-menu">
                <button className="hamburger-button" onClick={handleHamburgerClick}>
                    <i className="fa fa-bars"></i>
                </button>
            </div>
            {showLeftPanel && <NavBarInner isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
        </nav>
    );
};

export default NavBar;
