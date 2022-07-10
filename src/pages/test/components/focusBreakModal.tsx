import React, { useRef } from "react";
import ReactDom from "react-dom";


export const FocusModal = ({ setShowModal }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  //render the modal JSX in the portal div.
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>This is a Modal</h2>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>
 // 
 
};