import React, { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import InputText from "./components/InputText";
import axios from "axios";
import Responses from "./components/Responses";
import Spinner from "./components/Spinner/spinner";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme) {
      setDarkMode(JSON.parse(storedTheme)); // Apply stored theme
    }
  }, []);

  // Function to toggle the theme
  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode)); // Save new theme in localStorage
      return newMode;
    });
  };

  const fetchData = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("https://url-shortener-backend-image-v2.onrender.com/api/v2/showUrl");
      setData(response.data.data);
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false); // End loading
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNewUrl = (newUrl) => {
    setData((prevData) => [...prevData, newUrl]);
    setMessage("URL added successfully!");
  };

  const handleDeleteUrl = async (urlId) => {
    setLoading(true); // Start loading
    try {
      await axios.delete(`https://url-shortener-backend-image-v2.onrender.com/api/v2/delete/${urlId}`);
      setData((prevData) => prevData.filter((item) => item._id !== urlId));
      setMessage("URL deleted successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete URL.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-6 px-4 sm:px-6 md:px-8 lg:px-10">
        <InputText darkMode={darkMode} onNewUrl={handleNewUrl} />

        {loading && <Spinner />} {/* Show loading spinner */}

        {error && !loading && ( // Only show error if not loading
          <p className={`mt-4 ${darkMode ? "text-red-400" : "text-red-600"}`}>
            {error}
          </p>
        )}

        {message && !error && !loading && ( // Only show message if there's no error and not loading
          <p className={`mt-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            {message}
          </p>
        )}

        {data.length > 0 && !error && !loading ? ( // Adjusted condition to check for loading
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Grid layout */}
            <h2 className={`text-xl col-span-full ${darkMode ? "text-white" : "text-gray-900"}`}>
              Retrieved URLs:
            </h2>
            {data.map((urlItem) => (
              <Responses
                key={urlItem._id}
                url={urlItem.url}
                submittedUrl={urlItem.shortUrl}
                darkMode={darkMode}
                onDelete={() => handleDeleteUrl(urlItem._id)}
                id={urlItem._id}
              />
            ))}
          </div>
        ) : (
          !error && !loading && ( // Adjusted condition to check for loading
            <p className={`mt-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              No URLs found.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default App;
