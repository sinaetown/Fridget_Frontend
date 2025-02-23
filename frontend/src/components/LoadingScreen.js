import React from "react";
import "./loadingscreen.css";

const LoadingScreen = () => {
  return (
    <div
      style={{
        position: "fixed",
        height: "70vh",
        width: "100vw",
        zIndex: 2000,
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="loader">
        <div class="panWrapper">
          <div class="pan">
            <div class="food"></div>
            <div class="panBase"></div>
            <div class="panHandle"></div>
          </div>
          <div class="panShadow"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
