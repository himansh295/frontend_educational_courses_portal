import React from "react";
// import "./App.css";
import ReactLogo from "./images/Mask Group 1.png";

export default function Dashboard(props) {
  return (
    <div>
      <div className="Discover d-flex">
        <div className="discoverText">
          <p>{props.message1}</p>
          <h2>{props.message2}</h2>
        </div>
        <img src={ReactLogo} />
      </div>
    </div>
  );
}
