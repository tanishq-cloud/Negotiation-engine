import React, {useState} from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import NegotiationDetailsModal from './NegotiaitonDetailsModal';

const NegotiationListRenderer = ({ negotiations, onNegotiationClick }) => {
  
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Your Offers</h2>
      {negotiations.map((negotiation) => (
        <>
        <Card key={negotiation.negotiationId} className="mb-3">
          <Card.Body>
            <Card.Title>{negotiation.offerName}</Card.Title>
            <Card.Text>Status: <Badge bg={negotiation.status === 'accepted' ? 'success' : 'danger'}>
              {negotiation.status}
            </Badge>  
              </Card.Text>
            <Card.Text>Created At:  {negotiation.createdAt.toDate().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</Card.Text>
            <Card.Text>Negotiation ID: {negotiation.negotiationId}</Card.Text>
            <Button onClick={() => {setShowModal(true); 
                                    onNegotiationClick(negotiation)}
                                    }>
              View Negotiations Details
            </Button>
          </Card.Body>
        </Card>

        {/* Render the negotiation details modal */}  
        <NegotiationDetailsModal
        showModal={showModal}
        handleModalClose={handleModalClose}
        selectedNegotiation = {negotiation}
        />
        </>
      ))}
      


    </div>
  );
};

export default NegotiationListRenderer;
