import React from "react";
import "./loadingscreen.css";

const LoadingScreen = () => {
  return (
    <div class="container">
      {[...Array(21)].map((_, i) => (
        <div className="item" key={i} style={{ "--i": i }}></div>
      ))}
    </div>
  );
};

export default LoadingScreen;
