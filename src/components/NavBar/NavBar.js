import React, { useState } from 'react';
import style from './NavBar.module.css';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const NAvbar = () => {
    const font = {
        fontFamily: "Montserrat, bold"
    }
    const [nav, setNav] = useState(false);
    return (
        <header style={font} className={style.header}>
            <div className='container'>
                <div className={style.box}>
                    <div className={style.logo_image}>
                        <h2 >MyBotGPT</h2>
                        {/*<img src="https://avatars.mds.yandex.net/i?id=16943fcfcce16aced693961690bf97a96f953f11-7551053-images-thumbs&n=13" alt='/' />*/}
                    </div>
                    <ul
                        className={
                            nav ? [style.menu, style.active].join(' ') : [style.menu]
                        }
                    >
                        <li>
                            <a href='/dashboard'>Dashboard</a>
                        </li>
                        <li>
                            <a href='/about'>About Us</a>
                        </li>
                        <li>
                            <a href='/price'>Price</a>
                        </li>
                        <li>
                            <a href='##'>Contacts</a>
                        </li>
                    </ul>
                    <div onClick={() => setNav(!nav)} className={style.mobile_btn}>
                        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NAvbar;