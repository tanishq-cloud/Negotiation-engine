import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Carousel } from 'react-bootstrap';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';

const NegotiationList = () => {
    const [negotiations, setNegotiations] = useState([]);
   
  const [selectedNegotiation, setSelectedNegotiation] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const handleNegotiationClick = (negotiation) => {
    if (negotiation) {
        setSelectedNegotiation(negotiation);
        setShowModal(true);
      }
  };

  const handleModalClose = () => {
    setSelectedNegotiation(null);
    setShowModal(false);
  };

  const renderCounterOfferCards = () => {
    if (selectedNegotiation && selectedNegotiation.negotiationData.length > 1) {
      const counterOffers = selectedNegotiation.negotiationData.slice(1);
      console.log(selectedNegotiation)

      return (
        <Carousel>
          {counterOffers.map((counterOffer, index) => (
            <Carousel.Item key={index}>
              <Card>
                <Card.Body>
                  {/* Render counter offer details here */}
                  <Card.Title>Counter Offer {index + 1}</Card.Title>
                  <div className="mt-3">
            <p>
              <strong>Product:</strong> {counterOffer.Product}
            </p>
            <p>
              <strong>Price:</strong> {counterOffer.Price}
            </p>
            <p>
              <strong>Quantity:</strong>{" "}
              {counterOffer.Quantity}
            </p>
            <p>
              <strong>Warranty:</strong>{" "}
              {counterOffer.Warranty}
            </p>
            <p>
              <strong>Discount:</strong>{" "}
              {counterOffer.Discount}
            </p>
            <p>
              <strong>Buyer's Finder Fee:</strong>{" "}
              {counterOffer.BuyersFinderFee}
            </p>
            <p>
              <strong>Commission:</strong>{" "}
              {counterOffer.Commission}
            </p>
            <p>
              <strong>Settlement Window:</strong>{" "}
              {counterOffer.SettlementWindow}
            </p>
            <p>
              <strong>Settlement Cycle:</strong>{" "}
              {counterOffer.SettlementCycle}
            </p>
          </div>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      );
    }

    if (!negotiations || negotiations.length === 0) {
        return <div>Loading...</div>; // Display loading indicator
      }
  };

 
  const fetchNegotiations = async () => {
    try {
      const q = query(collection(db, 'negotiations'), where('uid', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const negotiationsData = querySnapshot.docs.map((doc) => doc.data());
      console.log(negotiationsData)
      setNegotiations(negotiationsData);
    } catch (error) {
      console.error('Error fetching negotiations:', error);
    }
  };

  // Call the data fetching function directly
  fetchNegotiations();
  console.log(negotiations);
  return (

    <div>
      <h2>Your Negotiations</h2>
      {negotiations.map((negotiation) => (
        <Card key={negotiation.negotiationId} className="mb-3">
          <Card.Body>
            <Card.Title>{negotiation.offerName}</Card.Title>
            <Card.Text>Status: {negotiation.status}</Card.Text>
            <Card.Text>Created At: {negotiation.createdAt}</Card.Text>
            <Card.Text>Negotiation ID: {negotiation.negotiationId}</Card.Text>
            <Button onClick={() => handleNegotiationClick(negotiation)}>
              View Details
            </Button>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Negotiation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-3">
            <Card.Body>
              {/* Render main offer details here */}
              <Card.Title>Proposed Offer</Card.Title>
              <div className="mt-3">
            <p>
              <strong>Product:</strong> {selectedNegotiation.negotiationData.Product}
            </p>
            <p>
              <strong>Price:</strong> {selectedNegotiation.negotiationData.Price}
            </p>
            <p>
              <strong>Quantity:</strong>{" "}
              {selectedNegotiation.negotiationData.Quantity}
            </p>
            <p>
              <strong>Warranty:</strong>{" "}
              {selectedNegotiation.negotiationData.Warranty}
            </p>
            <p>
              <strong>Discount:</strong>{" "}
              {selectedNegotiation.negotiationData.Discount}
            </p>
            <p>
              <strong>Buyer's Finder Fee:</strong>{" "}
              {selectedNegotiation.negotiationData.BuyersFinderFee}
            </p>
            <p>
              <strong>Commission:</strong>{" "}
              {selectedNegotiation.negotiationData.Commission}
            </p>
            <p>
              <strong>Settlement Window:</strong>{" "}
              {selectedNegotiation.negotiationData.SettlementWindow}
            </p>
            <p>
              <strong>Settlement Cycle:</strong>{" "}
              {selectedNegotiation.negotiationData.SettlementCycle}
            </p>
          </div>
            </Card.Body>
          </Card>

          {renderCounterOfferCards()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NegotiationList;
