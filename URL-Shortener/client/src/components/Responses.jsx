import React from "react";
import { Link } from "react-router-dom";

const Responses = ({ url, submittedUrl, darkMode, onDelete }) => {
  return (
    <div
      className={`mt-5 w-full max-w-md mx-auto p-4 sm:p-6 rounded-md shadow-md transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`flex flex-col border rounded-md p-4 ${
          darkMode ? "border-gray-600" : "border-gray-300"
        }`}
      >
        {/* Original URL Section */}
        <div className="flex flex-col mb-4">
          <h2 className={`font-bold mb-1 text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>
            Original URL
          </h2>
          <Link
            to={url}
            className={`text-blue-600 underline break-words text-sm sm:text-base ${
              darkMode ? "hover:text-blue-400" : ""
            }`}
            target="_blank"
          >
            {url}
          </Link>
        </div>

        {/* Shortened URL Section */}
        <div className="flex flex-col mb-4">
          <h2 className={`font-bold mb-1 text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>
            Shortened URL
          </h2>
          <Link
            to={submittedUrl ? `https://url-shortener-backend-image-v2.onrender.com/${submittedUrl}` : submittedUrl}
            className={`text-blue-600 underline break-words text-sm sm:text-base ${
              darkMode ? "hover:text-blue-400" : ""
            }`}
            target="_blank"
          >
            {submittedUrl ? `https://url-shortener-backend-image-v2.onrender.com/${submittedUrl}` : "URL not generated"}
          </Link>
        </div>

        {/* Delete Button */}
        <button
          onClick={onDelete} // Call the onDelete function passed from the parent
          className={`mt-4 py-2 px-4 rounded-md text-white text-sm sm:text-base ${
            darkMode ? "bg-red-600 hover:bg-red-500" : "bg-red-500 hover:bg-red-400"
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Responses;