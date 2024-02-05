import React, { useEffect, useRef, useState } from "react";
import  Card  from 'react-bootstrap/Card';
// import { format } from 'date-fns';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const NegotiationCard = ({ negotiation }) => {
  const [user] = useAuthState(auth);
  const isCurrentUser = user && negotiation.uid === user.uid;
  //TO-DO
//   const handleAcceptOffer = () => {
//     // Implement logic for accepting the offer (update the document, etc.)
//     console.log('Offer Accepted:', negotiation.id);
//   };

//   const handleRejectOffer = () => {
//     // Implement logic for rejecting the offer (update the document, etc.)
//     console.log('Offer Rejected:', negotiation.id);
//   };

//   const handleCounterOffer = () => {
//     // Open the negotiation form with previous values for counter offer
//     setShowCounterOfferForm(true);
//   };

//   const handleCounterOfferClose = () => {
//     // Close the counter offer form
//     setShowCounterOfferForm(false);
//   };

//   const handleCounterOfferSubmit = (counterOfferData) => {
//     // Implement logic for handling counter offer submission
//     console.log('Counter Offer Submitted:', counterOfferData);
//     setShowCounterOfferForm(false);
//     // You can update the document with the counterOfferData here
//   };

console.log(negotiation);
console.log("Card is here only")
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
    </Card>
    </div>
  );
};

export default NegotiationCard;
