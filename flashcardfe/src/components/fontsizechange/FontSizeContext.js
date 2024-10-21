import React, { createContext, useContext, useState } from 'react';

// Tạo context
const FontSizeContext = createContext();

// Tạo provider để cung cấp kích thước font
export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16); // Kích thước font mặc định

    const increaseFontSize = () => {
        setFontSize((prevSize) => prevSize + 2);
    };

    const decreaseFontSize = () => {
        setFontSize((prevSize) => Math.max(prevSize - 2, 10));
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

// Hook để sử dụng context
export const useFontSize = () => {
    return useContext(FontSizeContext);
};
