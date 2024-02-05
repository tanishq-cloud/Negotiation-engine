import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { MdAddCard } from "react-icons/md";
import NegotiationForm from "./NegotiationForm";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const [showNegotiationForm, setShowNegotiationForm] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const handleNegotiationClick = () => {
  //   console.log("Negotiation button clicked");
  //   setShowNegotiationForm(true);
  // };
  const handleNegotiationClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid input");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      type : "message",
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });

    
  };
  return (
    <>
      
      <div className="send-message-container">
        <button onClick={handleNegotiationClick} className="negotiation-button">
          <MdAddCard />
        </button>
        <form onSubmit={(event) => sendMessage(event)} className="send-message">
          <label htmlFor="messageInput" hidden>
            Enter Message
          </label>
          <input
            id="messageInput"
            name="messageInput"
            type="text"
            className="form-input__input"
            placeholder="type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
      <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Negotiation Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* {showNegotiationForm && (
        <NegotiationForm  />
      )} */}
          <NegotiationForm onCancel={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </>
  );
  
};

export default SendMessage;