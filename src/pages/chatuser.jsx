import React, { useState } from 'react';

import './chatuser.css';
const Chatuser = () => {
    const [data, setdata] = useState({
        source: 'https://w7.pngwing.com/pngs/163/715/png-transparent-dark-mode-moon-night-forecast-weather-multimedia-solid-px-icon.png',
        data_enable: true,
        bg: '#b2b9ec'
    });
    const body_bg = document.querySelector("body");
    body_bg.style.backgroundColor = data.bg;
    const change_theme = () => {
        if (data.data_enable) {
            setdata({ ...data, source: 'https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-sun-icon-png-image_3985716.jpg', data_enable: false, bg: 'rgb(76, 76, 104)' });
        }
        else {
            setdata({ ...data, source: 'https://w7.pngwing.com/pngs/163/715/png-transparent-dark-mode-moon-night-forecast-weather-multimedia-solid-px-icon.png', data_enable: true, bg: '#b2b9ec' });
        }
    };
    return (
        <div className='profile-name-container'>
            <div className='logo-name'>
            <span className='Cimageion'>G-chat</span>
            <div className='moon-container'>
            
            <a href="#">Log out</a>
                <img src={data.source} alt='moon-light' onClick={change_theme} className='moon-light' />
                <img src='https://gargicollege.in/wp-content/themes/gargi-college/img/default-user.png' className='profile-pic' />
                
            </div>
            </div>
        </div>
    )
}

export default Chatuser
