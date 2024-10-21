import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Import các biểu tượng
import './FontSizeChanger.scss'; // Import file CSS

const FontSizeChanger = () => {
    const [fontSize, setFontSize] = useState(16); // Giá trị mặc định là 16px

    const increaseFontSize = () => {
        setFontSize((prevSize) => prevSize + 2); // Tăng kích thước font lên 2px
    };

    const decreaseFontSize = () => {
        setFontSize((prevSize) => Math.max(prevSize - 2, 10)); // Giảm kích thước font, tối thiểu là 10px
    };

    // Áp dụng kích thước font cho body
    document.body.style.fontSize = `${fontSize}px`;

    return (
        <div className="font-size-changer">
            <button onClick={decreaseFontSize} aria-label="Decrease Font Size">
                <FaMinus />
            </button>
            <button onClick={increaseFontSize} aria-label="Increase Font Size">
                <FaPlus />
            </button>
        </div>
    );
};

export default FontSizeChanger;
