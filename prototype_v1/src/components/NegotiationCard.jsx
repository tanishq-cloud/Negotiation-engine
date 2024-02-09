import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { setDoc, collection, where, query, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "react-bootstrap/Button";
import {Row, Col, Alert} from "react-bootstrap";
import NegotiationForm from "./NegotiationForm";

const NegotiationCard = ({ negotiation }) => {
  const [user] = useAuthState(auth);
  const [showCounterForm, setShowForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const isCurrentUser = user && negotiation.uid === user.uid;
  //console.log(isCurrentUser);

  const getStatusMessage = async () => {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "negotiations"),
          where("negotiationId", "==", `${negotiation.negotiationId}`)
        )
      );

      if (querySnapshot.empty) {
        return null; // Negotiation document not found
      }

      const documentData = querySnapshot.docs[0].data();

      if (documentData.status === "accepted") {
        return "Accepted";
      } else if (documentData.status === "rejected") {
        return "Rejected";
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting negotiation document:", error);
      return null;
    }
  };

  useEffect(() => {
    getStatusMessage().then((message) => {
      setStatusMessage(message);
      
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [negotiation.negotiationId]);

  const handleAccept = async () => {
    try {
      // Update the negotiation document with status: accepted
      const query1 = query(
        collection(db, "negotiations"),
        where("negotiationId", "==", `${negotiation.negotiationId}`)
      );
      const querySnapshot = await getDocs(query1);
      console.log(querySnapshot);
      const docRef = querySnapshot.docs[0].ref;
      //console.log(docRef);


      console.log("Negotiaition Id: " + negotiation.negotiationId);
      await setDoc(
        docRef,
        {
          status: "accepted",
        },
        { merge: true }
      );
      console.log("Offer Accepted");
      //window.location.reload();
      setStatusMessage('Offer Accepted');
    } catch (error) {
      console.error("Error accepting negotiation:", error);
    }
  };

  const handleReject = async () => {
    try {
      // Update the negotiation document with status: rejected
      const query1 = query(
        collection(db, "negotiations"),
        where("negotiationId", "==", `${negotiation.negotiationId}`)
      );
      const querySnapshot = await getDocs(query1);
      if (querySnapshot.empty) {
        console.log(
          "No documents found with the given negotiationId"
        );
      } else {
        const docRef = querySnapshot.docs[0].ref;

        console.log("Negotiaition Id: " + negotiation.negotiationId);
        await setDoc(
          docRef,
          {
            status: "rejected",
          },
          { merge: true }
        );
        console.log("Offer rejected");
        //window.location.reload();
        setStatusMessage('Offer Rejected');
      }
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

  

  return (
    <div
      className={`chat-bubble ${
        negotiation.uid === user.uid ? "right" : ""
      }`}
    >
      <Card
        className={`mb-3 ${
          isCurrentUser ? true : false
        }`}
        style={{ width: "18rem" }}
      >
        <Card.Header>
          <div className="align-items-center"><strong>Negotiaition Id:</strong> {negotiation.negotiationId}</div>
        </Card.Header>
        <Card.Header>
          <div className="d-flex align-items-center">
            <img
              className="chat-bubble__left"
              src={negotiation.avatar}
              alt="user avatar"
            />
            <div className="ms-3">
              <h4 className="user-name">{negotiation.name}</h4>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="mt-3">
            <p>
              <strong>Product:</strong> {negotiation.negotiationData.Product}
            </p>
            <p>
              <strong>Price:</strong> {negotiation.negotiationData.Price}
            </p>
            <p>
              <strong>Quantity:</strong>{" "}
              {negotiation.negotiationData.Quantity}
            </p>
            <p>
              <strong>Warranty:</strong>{" "}
              {negotiation.negotiationData.Warranty}
            </p>
            <p>
              <strong>Discount:</strong>{" "}
              {negotiation.negotiationData.Discount}
            </p>
            <p>
              <strong>Buyer's Finder Fee:</strong>{" "}
              {negotiation.negotiationData.BuyersFinderFee}
            </p>
            <p>
              <strong>Commission:</strong>{" "}
              {negotiation.negotiationData.Commission}
            </p>
            <p>
              <strong>Settlement Window:</strong>{" "}
              {negotiation.negotiationData.SettlementWindow}
            </p>
            <p>
              <strong>Settlement Cycle:</strong>{" "}
              {negotiation.negotiationData.SettlementCycle}
            </p>
          </div>
        </Card.Body>
        
        <Card.Footer>
          {statusMessage ? (
          <div className="mb-3">
      <Alert key={statusMessage} variant={statusMessage === 'Accepted' ? 'success' : 'danger'}>
        Offer: {statusMessage}
      </Alert>
         </div>
          ) : (
            <div className="mb-3">
              {isCurrentUser ? (
                <Button variant="primary" className="me-2" onClick={handleCounterOffer}>
                  Edit Offer
                </Button>
              ) : negotiation.counterBy !== "Open" ? (
                <>
                <Row>
                  <Col><Button variant="danger" className="me-2" onClick={handleReject}>
                    Reject
                  </Button>
                  
                  </Col>
                  <Col>
                  <Button variant="success" className="me-2" onClick={handleAccept}>
                    Accept
                  </Button>
                  </Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col>
                  <div className="d-grid gap-2">
                  
                  <Button variant="primary" onClick={handleCounterOffer}>
                    Counter Offer
                  </Button>
                </div></Col>
                </Row>
                </>
              ) : (
                <Button variant="primary" className="me-1" onClick={handleCounterOffer}>
                  Counter Offer
                </Button>
              )}
            </div>
          )}
        </Card.Footer>
       
      </Card>
      {showCounterForm && (
        <NegotiationForm
          onCancel={handleFormCancel}
          initialData={negotiation}
        />
      )}
    </div>
  );
};

export default NegotiationCard;
