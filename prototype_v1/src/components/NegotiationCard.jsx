import React, {useState} from "react";
import  Card  from 'react-bootstrap/Card';
import {updateDoc,doc} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from 'react-bootstrap/Button'
import NegotiationForm from "./NegotiationForm";

const NegotiationCard = ({ negotiation }) => {
  const [user] = useAuthState(auth);
  const [showCounterForm, setShowForm] = useState(false);

  const isCurrentUser = user && negotiation.uid === user.uid;
  const handleAccept = async () => {
    try {
      console.log(negotiation);
      await updateDoc(doc(db, "negotiations", negotiation.negotiationId), {
        status: "accepted",
      });
      
    } catch (error) {
      console.error("Error accepting negotiation:", error);
    }
  };

  const handleReject = async () => {
    try {
      // Update the negotiation document with status: rejected
      await updateDoc(db.collection('negotiations').doc(negotiation.negotiationId), {
        status: "rejected",
      });
    } catch (error) {
      console.error("Error rejecting negotiation:", error);
    }
  };

  const handleCounterOffer = () => {
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

// console.log(negotiation);
// console.log("Card is here only")
  return (
    <div
      className={`chat-bubble ${negotiation.uid === user.uid ? "right" : ""}`}>
    <Card className={`mb-3 ${isCurrentUser ? 'sender' : 'receiver'}`}  style={{ width: '18rem' }}>
    <Card.Header>
    <div className="align-items-center">Proposed Negotiation</div>
    <div className="d-flex align-items-center">
    
          <img className="chat-bubble__left" src={negotiation.avatar} alt="user avatar" />
          <div className="ms-3">
            <h6 className="user-name">{negotiation.name}</h6>
            {/* <p className="timestamp">{formattedTimestamp}</p> */}
          </div>
        </div>
    </Card.Header>
      <Card.Body>
        
        <div className="mt-3">
          <p><strong>Product:</strong> {negotiation.negotiationData.Product}</p>
          <p><strong>Price:</strong> {negotiation.negotiationData.Price}</p>
          <p><strong>Quantity:</strong> {negotiation.negotiationData.Quantity}</p>
          <p><strong>Warranty:</strong> {negotiation.negotiationData.Warranty}</p>
          <p><strong>Discount:</strong> {negotiation.negotiationData.Discount}</p>
          <p><strong>Buyer's Finder Fee:</strong> {negotiation.negotiationData.BuyersFinderFee}</p>
          <p><strong>Commission:</strong> {negotiation.negotiationData.Commission}</p>
          <p><strong>Settlement Window:</strong> {negotiation.negotiationData.SettlementWindow}</p>
          <p><strong>Settlement Cycle:</strong> {negotiation.negotiationData.SettlementCycle}</p>
        </div>
      </Card.Body>
      <Card.Footer>
      <div className="mb-3">
            <Button variant="success" className="me-2" onClick={handleAccept}>
              Accept
            </Button>
            <Button variant="danger" className="me-2" onClick={handleReject}>
              Reject
            </Button>
            <Button variant="primary" className="me-2" onClick={handleCounterOffer}>
              Counter Offer
            </Button>
          </div>
          

      </Card.Footer>
    </Card>
    {showCounterForm && (
  <NegotiationForm
    onCancel={handleFormCancel}
    initialData={{
      negotiation

      // Add other fields as needed
    }} />
    )}
    </div>

  );
};

export default NegotiationCard;
