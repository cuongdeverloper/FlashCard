import React, { useEffect, useState } from "react";
import { ReactComponent as Sun } from "../../assests/Sun.svg";
import { ReactComponent as Moon } from "../../assests/Moon.svg";
import "./DarkMode.scss";

const DarkMode = () => {
  
    const [isDarkMode, setIsDarkMode] = useState(false);

   
    useEffect(() => {
        const currentTheme = localStorage.getItem("data-theme") || "light";
        setIsDarkMode(currentTheme === "dark");
        document.querySelector("body").setAttribute('data-theme', currentTheme);
    }, []);


    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
        localStorage.setItem("data-theme", "light");
        setIsDarkMode(false);
    }

   
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
        localStorage.setItem("data-theme", "dark");
        setIsDarkMode(true);
    }


    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                checked={isDarkMode} 
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
