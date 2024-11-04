import React, { useEffect , useState} from "react";
import { ReactComponent as Sun } from "../../assests/Sun.svg";
import { ReactComponent as Moon } from "../../assests/Moon.svg";
import "./DarkMode.scss";

const DarkMode = () => {
    // Use a state to track dark mode status
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Retrieve from localStorage, default to false
        return localStorage.getItem("theme") === "dark";
    });

    // Apply theme on initial load
    useEffect(() => {
        if (isDarkMode) {
            document.body.setAttribute("data-theme", "dark");
        } else {
            document.body.setAttribute("data-theme", "light");
        }
    }, [isDarkMode]);

    // Toggle theme function
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.body.setAttribute("data-theme", newMode ? "dark" : "light");
            localStorage.setItem("theme", newMode ? "dark" : "light"); // Save to localStorage
            return newMode;
        });
    };

    return (
        <div className="dark_mode">
            <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                checked={isDarkMode}
                onChange={toggleTheme}
            />
            <label className="dark_mode_label" htmlFor="darkmode-toggle">
                <Sun className="sun" />
                <Moon className="moon" />
            </label>
        </div>
    );
};

export default DarkMode;
