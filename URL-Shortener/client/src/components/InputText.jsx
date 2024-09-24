import React, { useCallback, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner/spinner"; // Make sure to import your spinner component

const InputText = ({ darkMode, onNewUrl }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setError(""); // Reset error when user starts typing
    setSuccessMessage(""); // Reset success message
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccessMessage("");
      try {
        const response = await axios.post("https://url-shortener-backend-image-v2.onrender.com/api/v2/url", {
          url,
        });
        console.log("API Response:", response); // Log the whole response
        onNewUrl(response.data); // Update the parent component
        setUrl(""); // Clear the input field
        setSuccessMessage(response.data.message); // Display success message
      } catch (error) {
        console.error("Error response:", error); // Log the error response
        if (error.response && error.response.data) {
          setError(error.response.data.message || "Something went wrong!");
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    },
    [url, onNewUrl]
  );

  return (
    <>
      <div
        className={`max-w-lg w-full mx-auto p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="url"
              className={`text-base sm:text-lg font-medium mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Original URL
            </label>
            <input
              type="text"
              name="url"
              id="url"
              value={url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600 focus:ring-gray-300"
                  : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-sm mt-2">{successMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full rounded-md shadow-md px-4 py-2 font-semibold transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Submit
          </button>
        </form>
      </div>

      {loading && <Spinner />}
    </>
  );
};

export default InputText;
