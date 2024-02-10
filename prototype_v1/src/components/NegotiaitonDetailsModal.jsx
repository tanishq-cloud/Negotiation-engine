import React, {useState} from 'react';
import { Modal, Button, Card, Row, Col, Alert } from 'react-bootstrap';
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
  //console.log("i dont'know it is fetching it?",selectedNegotiation);
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
            <Alert key={selectedNegotiation.status} variant={selectedNegotiation.status === 'accepted' ? 'success' : 'danger'}>
              <h2>Status: {selectedNegotiation.status}</h2>
              </Alert>
            </Card.Footer>
        </Card>
        </Col>
        <Col md={6}>
        {selectedNegotiation.negotiationData.length > 1 && (
          <RenderCounterOffer counterOffers={selectedNegotiation.negotiationData } highlightChanges />
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
             <p>Details are compared with the proposed offer.</p>
             <div className="mt-3">
               {finalAcceptedOffer.map((finalOffer, index) => (
                <>
                 <p key={index}>
                   <strong>Product:</strong> {finalOffer.Product}
                   {finalOffer.Product !== selectedNegotiation.negotiationData[0].Product && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                 </p>
                 <p>
                 <strong>Price:</strong> {finalOffer.Price}
                 {finalOffer.Price !== selectedNegotiation.negotiationData[0].Price && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                 </p>
                 <p>
                 <strong>Quantity:</strong>{" "}
                 {finalOffer.Quantity}
                 {finalOffer.Quantity !== selectedNegotiation.negotiationData[0].Quantity && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                 </p>
                 <p>
                 <strong>Warranty:</strong>{" "}
                 {finalOffer.Warranty}
                 {finalOffer.Warranty !== selectedNegotiation.negotiationData[0].Warranty && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                 </p>
                 <p>
                 <strong>Discount:</strong>{" "}
                 {finalOffer.Discount}
                 {finalOffer.Discount !== selectedNegotiation.negotiationData[0].Discount && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                 </p>
                 <p>
                 <strong>Buyer's Finder Fee:</strong>{" "}
                 {finalOffer.BuyersFinderFee}
                 {finalOffer.BuyersFinderFee !== selectedNegotiation.negotiationData[0].BuyersFinderFee && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                 </p>
                 <p>
                 <strong>Commission:</strong>{" "}
                 {finalOffer.Commission}
                 {finalOffer.Commission !== selectedNegotiation.negotiationData[0].Commission && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                 </p>
                 <p>
                 <strong>Settlement Window:</strong>{" "}
                 {finalOffer.SettlementWindow}
                 {finalOffer.SettlementWindow !== selectedNegotiation.negotiationData[0].SettlementWindow && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                 </p>
                 <p>
                 <strong>Settlement Cycle:</strong>{" "}
                 {finalOffer.SettlementCycle}
                 {finalOffer.SettlementCycle !== selectedNegotiation.negotiationData[0].SettlementCycle && (
                    <span className="text-danger"> (Changed)</span>
                  )}
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
          <Button variant="success" onClick={() => { handleFinalAcceptedOfferClick();
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
