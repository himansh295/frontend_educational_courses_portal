import React from "react";
import cross from "./images/cross.svg";
import "./modal.css";

const ModalMain = (props) => {
  return (
    <div className="modal">
      <section className="modal-main">
        <header>
          <button type="button" onClick={() => props.showModal(false)}>
            Close
          </button>
        </header>
        <div style={{ textAlign: "center", marginTop:"4.5em" }}>{props.message}</div>
      </section>
    </div>
  );
};

export default ModalMain;
