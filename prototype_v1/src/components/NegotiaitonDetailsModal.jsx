import React, {useState} from 'react';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import RenderCounterOffer from './RenderCounterOffer';
import NegotiationAnalysis from './NegotiationAnalysis';

const NegotiationDetailsModal = ({ showModal, handleModalClose, selectedNegotiation }) => {
  
  
  
  const [isFinalAccepted, setIsFinalAccepted] = useState(false);
  const [showFinalAccepted, setFinalAccepted] = useState(false)
  const finalAcceptedOffer = isFinalAccepted
  ? [selectedNegotiation.negotiationData[selectedNegotiation.negotiationData.length - 1]]
  : [];
  const handleFinalAcceptedOfferClick = () => {
    setIsFinalAccepted(true);
    setFinalAccepted(true);
    console.log('Final Accepted Offer clicked');
  };
  console.log("i dont'know it is fetching it?",selectedNegotiation);
  return (
    <Modal show={showModal} onHide={handleModalClose} size="lg">
      <Modal.Header closeButton>
        <Row>
          <Col>
        <Modal.Title>Negotiation Details</Modal.Title>
        </Col>
        <Col>
        <NegotiationAnalysis negotiationData={selectedNegotiation.negotiationData} negotiationStatus={selectedNegotiation.status} />
     </Col>
      </Row>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md = {6}>
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Proposed Offer</Card.Title>
                    <div className="mt-3">
                    <p>
                    <strong>Product:</strong> {
                    selectedNegotiation.negotiationData[0].Product}
                    </p>
                    <p>
                    <strong>Price:</strong> {selectedNegotiation.negotiationData[0].Price}
                    </p>
                    <p>
                    <strong>Quantity:</strong>
                    {selectedNegotiation.negotiationData[0].Quantity}
                    </p>
                    <p>
                    <strong>Warranty:</strong>
                    {selectedNegotiation.negotiationData[0].Warranty}
                    </p>
                    <p>
                    <strong>Discount:</strong>
                    {selectedNegotiation.negotiationData[0].Discount}
                    </p>
                    <p>
                    <strong>Buyer's Finder Fee:</strong>
                    {selectedNegotiation.negotiationData[0].BuyersFinderFee}
                    </p>
                    <p>
                    <strong>Commission:</strong>
                    {selectedNegotiation.negotiationData[0].Commission}
                    </p>
                    <p>
                    <strong>Settlement Window:</strong>
                    {selectedNegotiation.negotiationData[0].SettlementWindow}
                    </p>
                    <p>
                    <strong>Settlement Cycle:</strong>
                    {selectedNegotiation.negotiationData[0].SettlementCycle}
                    </p>
                </div>
            </Card.Body>
            <Card.Footer>
              <h2>Status: {selectedNegotiation.status}</h2>
            </Card.Footer>
        </Card>
        </Col>
        <Col md={6}>
        {selectedNegotiation.negotiationData.length > 1 && (
          <RenderCounterOffer counterOffers={selectedNegotiation.negotiationData.slice(1) } highlightChanges />
        )}

        
          {/* To render the Final Accepted Offer */}
        {isFinalAccepted && (
          <Modal show={showFinalAccepted} onHide={()=> {setIsFinalAccepted(false); 
          setFinalAccepted(false);}}>
            <Modal.Header closeButton>
        <Modal.Title>Final Offer Details:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
           <Card className="mb-3">
           <Card.Body>
             <Card.Title>Final Accepted Offer</Card.Title>
             <div className="mt-3">
               {finalAcceptedOffer.map((finalOffer, index) => (
                <>
                 <p key={index}>
                   <strong>Product:</strong> {finalOffer.Product}
                 </p>
                 <p>
                 <strong>Price:</strong> {finalOffer.Price}
                 </p>
                 <p>
                 <strong>Quantity:</strong>{" "}
                 {finalOffer.Quantity}
                 </p>
                 <p>
                 <strong>Warranty:</strong>{" "}
                 {finalOffer.Warranty}
                 </p>
                 <p>
                 <strong>Discount:</strong>{" "}
                 {finalOffer.Discount}
                 </p>
                 <p>
                 <strong>Buyer's Finder Fee:</strong>{" "}
                 {finalOffer.BuyersFinderFee}
                 </p>
                 <p>
                 <strong>Commission:</strong>{" "}
                 {finalOffer.Commission}
                 </p>
                 <p>
                 <strong>Settlement Window:</strong>{" "}
                 {finalOffer.SettlementWindow}
                 </p>
                 <p>
                 <strong>Settlement Cycle:</strong>{" "}
                 {finalOffer.SettlementCycle}
                 </p>
                 </>
               ))}
             </div>
           </Card.Body>
         </Card>
         </Modal.Body>
         </Modal>
       )}
      
        </Col>
      </Row>
      </Modal.Body>
      <Modal.Footer>
        <>
        {selectedNegotiation.status === 'accepted' && (
          <Button variant="primary" onClick={() => { handleFinalAcceptedOfferClick();
                                                     setIsFinalAccepted(true);}}>
            Final Accepted Offer
          </Button>
        )}
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        </>
      </Modal.Footer>
    </Modal>
  );
};

export default NegotiationDetailsModal;
