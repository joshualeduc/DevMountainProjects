import React from "react";
import ReactDOM from "react-dom";
import "./styles.css"
import App from "./components/App.js";

document.addEventListener("DOMContentLoaded", () => {
  const reactNode = document.getElementById("react-node");

  if(reactNode){
    ReactDOM.render(
      <App />,
      reactNode)
  }
});