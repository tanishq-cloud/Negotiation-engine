import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { MdAddCard } from "react-icons/md";
import NegotiationForm from "./NegotiationForm";
import Modal from 'react-bootstrap/Modal';
import { IoMdSend } from "react-icons/io";



const SendMessage = ({ scroll }) => {

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  
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
            placeholder="Type Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="send-button">
          <IoMdSend size={22}/>
          </button>
        </form>
      </div>
      <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Offer Form</Modal.Title>
        </Modal.Header>
        
          <NegotiationForm onCancel={handleCloseModal} />
        
      </Modal>
    </>
  );
  
};

export default SendMessage;