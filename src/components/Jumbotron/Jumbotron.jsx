import React from "react";
import "./Jumbotron.modules.css";

const Jumbotron = ({ height }) => {
  return (
    <div
      className={`jumbotron ${
        height === "full" ? "full__height" : "half__height"
      }`}
    ></div>
  );
};

export default Jumbotron;
