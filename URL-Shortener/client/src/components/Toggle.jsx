// Toggle.jsx
import React from "react";

const Toggle = ({ darkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer focus:outline-none ${
        darkMode ? "bg-gray-700" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
          darkMode ? "translate-x-6" : ""
        }`}
      />
    </button>
  );
};

export default Toggle;
