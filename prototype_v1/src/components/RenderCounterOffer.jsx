import React from 'react';
import { Card, Carousel } from 'react-bootstrap';

const RenderCounterOffer = ({ counterOffers, highlightChanges }) => {
  const mainOffer = counterOffers[0];
  counterOffers = counterOffers.slice(1);
  console.log(mainOffer)
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
                  {highlightChanges && counterOffer.Product !== mainOffer.Product && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Price:</strong> {counterOffer.Price}
                  {highlightChanges && counterOffer.Price !== mainOffer.Price && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Quantity:</strong> {counterOffer.Quantity}
                  {highlightChanges && counterOffer.Quantity !== mainOffer.Quantity && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Warranty:</strong> {counterOffer.Warranty}
                  {highlightChanges && counterOffer.Warranty !== mainOffer.Warranty && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Discount:</strong> {counterOffer.Discount}
                  {counterOffer.Discount !== mainOffer.Discount && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Buyer's Finder Fee:</strong> {counterOffer.BuyersFinderFee}
                  {highlightChanges && counterOffer.BuyersFinderFee !== mainOffer.BuyersFinderFee && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Commission:</strong> {counterOffer.Commission}
                  {highlightChanges && counterOffer.Commission !== mainOffer.Commission && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Settlement Window:</strong> {counterOffer.SettlementWindow}
                  {highlightChanges && counterOffer.SettlementWindow !== mainOffer.SettlementWindow && (
                    <span className="text-danger"> (Changed)</span>
                  )}
                </p>
                <p>
                  <strong>Settlement Cycle:</strong> {counterOffer.SettlementCycle}
                  {highlightChanges && counterOffer.SettlementCycle !== mainOffer.SettlementCycle && (
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
