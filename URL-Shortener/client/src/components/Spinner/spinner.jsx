import React from "react";
import "./spinner.css"

const spinner = () => {
  return (
    /* From Uiverse.io by Abrar-Hussain1 */
    <div className="loader-container">
      <div className="loader" />
      <div className="loader-text">Loading...</div>
    </div>
  );
};

export default spinner;
