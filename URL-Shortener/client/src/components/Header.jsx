// Header.jsx
import React from "react";
import Toggle from "./Toggle"; // Ensure the path is correct

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header
      className={`sticky top-0 z-50 p-4 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1
            className={`text-2xl sm:text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            URL Shortener
          </h1>
          <Toggle darkMode={darkMode} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Header;
