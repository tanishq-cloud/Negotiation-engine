import React, {useState} from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import NegotiationDetailsModal from './NegotiaitonDetailsModal';
import { Fragment } from 'react';

const NegotiationListRenderer = ({ negotiations, onNegotiationClick }) => {
  
  const [modalStates, setModalStates] = useState({});
  const handleModalClose = (negotiationId) => {
    setModalStates((prevStates) => ({
      ...prevStates,
      [negotiationId]: false,
    }));
  };

  const handleViewDetailsClick = (negotiation) => {
    setModalStates((prevStates) => ({
      ...prevStates,
      [negotiation.negotiationId]: true,
    }));
    onNegotiationClick(negotiation);
  };

  

  return (
    <div>
      <h2>Your Offers</h2>
      {negotiations.map((negotiation) => (
        <Fragment>
        <Card key={negotiation.negotiationId} className="mb-3">
          <Card.Header>
           <h2> {negotiation.offerName}</h2>
          </Card.Header>
          <Card.Body>
            
            <Card.Text>Status: <Badge bg={negotiation.status === 'accepted' ? 'success' : 'danger'}>
              {negotiation.status}
            </Badge>  
              </Card.Text>
            <Card.Text>Created At:  {negotiation.createdAt.toDate().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</Card.Text>
            <Card.Text>Negotiation ID: {negotiation.negotiationId}</Card.Text>
            <Button onClick={() => {handleViewDetailsClick(negotiation)}
                                    }>
              View Negotiations Details
            </Button>
          </Card.Body>
        </Card>

        {/* Render the negotiation details modal */}  
        <NegotiationDetailsModal
         showModal={modalStates[negotiation.negotiationId] || false}
         handleModalClose={() => handleModalClose(negotiation.negotiationId)}
         selectedNegotiation={negotiation}
        />
        </Fragment>
      ))}
      


    </div>
  );
};

export default NegotiationListRenderer;
