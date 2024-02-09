import React from 'react';
import { Card, Carousel } from 'react-bootstrap';

const RenderCounterOffer = ({ counterOffers, highlightChanges }) => {
  
  return (
    <Carousel>
      {counterOffers.map((counterOffer, index) => (
        <Carousel.Item key={index}>
          <Card>
            <Card.Body>
              <Card.Title>Counter Offer {index + 1}</Card.Title>
              <div className="mt-3">
                <p>
                  <strong>Product:</strong> {counterOffer.Product}
                  {highlightChanges && counterOffer.Product !== counterOffers[0].Product && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Price:</strong> {counterOffer.Price}
                  {highlightChanges && counterOffer.Price !== counterOffers[0].Price && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Quantity:</strong> {counterOffer.Quantity}
                  {highlightChanges && counterOffer.Quantity !== counterOffers[0].Quantity && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Warranty:</strong> {counterOffer.Warranty}
                  {highlightChanges && counterOffer.Warranty !== counterOffers[0].Warranty && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Discount:</strong> {counterOffer.Discount}
                  {counterOffer.Discount !== counterOffers[0].Discount && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Buyer's Finder Fee:</strong> {counterOffer.BuyersFinderFee}
                  {highlightChanges && counterOffer.BuyersFinderFee !== counterOffers[0].BuyersFinderFee && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Commission:</strong> {counterOffer.Commission}
                  {highlightChanges && counterOffer.Commission !== counterOffers[0].Commission && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Settlement Window:</strong> {counterOffer.SettlementWindow}
                  {highlightChanges && counterOffer.SettlementWindow !== counterOffers[0].SettlementWindow && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Settlement Cycle:</strong> {counterOffer.SettlementCycle}
                  {highlightChanges && counterOffer.SettlementCycle !== counterOffers[0].SettlementCycle && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default RenderCounterOffer;
