import React, { useEffect } from "react";
import { ReactComponent as Sun } from "../../assests/Sun.svg";
import { ReactComponent as Moon } from "../../assests/Moon.svg";
import "./DarkMode.scss";

const DarkMode = () => {

    // Set default dark mode on load
    useEffect(() => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
    }, []);

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
    }
    
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
    }

    const toggleTheme = (e) => {
        if (e.target.checked) setLightMode();
        else setDarkMode();
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
