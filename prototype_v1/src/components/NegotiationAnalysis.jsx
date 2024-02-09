import React, { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import { Modal, Button } from 'react-bootstrap';

const NegotiationAnalysis = ({ negotiationData, negotiationStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [similarityIndex, setSimilarityIndex] = useState(0);

  const preprocessData = (offer) => {
    const settlementWindowOptions = ['15 days', '30 days', '60 days', '90 days'];
    const settlementCycleOptions = ['Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Yearly'];

    const numericalValues = [
      Number(offer.Price)/ Math.pow(10, offer.Price.toString().length),
      Number(offer.Quantity)/ Math.pow(10, offer.Quantity.toString().length),
      Number(offer.Discount)/ Math.pow(10, offer.Discount.toString().length),
      Number(offer.BuyersFinderFee)/ Math.pow(10, offer.BuyersFinderFee.toString().length),
      Number(offer.Commission)/ Math.pow(10, offer.Commission.toString().length),
      settlementWindowOptions.indexOf(offer.SettlementWindow),
      settlementCycleOptions.indexOf(offer.SettlementCycle),];


  return numericalValues;
    
  };

  
  const calculateSimilarityIndex = () => {
    if (negotiationData && negotiationData.length >= 2) {
      const firstOfferData = preprocessData(negotiationData[0]);
      const lastOfferData = preprocessData(negotiationData[negotiationData.length - 1]);
  
      console.log("First Offer Data:", firstOfferData);
      console.log("Last Offer Data:", lastOfferData);
  
      // Calculate Euclidean distance
      const sumOfSquares = firstOfferData.reduce((acc, value, index) => {
        console.log(value, lastOfferData[index]);
        return acc + Math.pow(value - lastOfferData[index], 2);
      }, 0);
  
      console.log("Sum of Squares:", sumOfSquares);
  
      const euclideanDistance = Math.sqrt(sumOfSquares);
      console.log("Euclidean Distance:", euclideanDistance);
  
      const similarity = 1 / (1 + euclideanDistance); // Normalize to 0-1 range
  
      console.log("Similarity:", similarity);
  
      setSimilarityIndex(similarity * 100); // Convert to percentage
    }
  };
  useEffect(() => {
    calculateSimilarityIndex();
  }, [negotiationData]);

  const chartData = {
    labels: ['Similarity', 'Difference'],
    datasets: [
      {
        data: [similarityIndex, 100 - similarityIndex],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  // Function to calculate the likelihood of acceptance based on similarity
  const calculateLikelihood = () => {
    // Example: Assume a threshold of 80% similarity for convergence
    const similarityThreshold = 80;
    return similarityIndex >= similarityThreshold ? 'High' : 'Low';
  };

  const likelihood = calculateLikelihood();

  const [chartInstance, setChartInstance] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      if (!chartInstance) {
        const newChartInstance = new Chart(ctx, {
          type: 'doughnut',
          data: chartData,
        });
        setChartInstance(newChartInstance);
      } else {
        chartInstance.data = chartData;
        chartInstance.update();
      }
    }
  }
  return () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };
}, [chartInstance, chartData])
  

  return (
    <div>
      <div>
      <p>Similarity Index: {similarityIndex.toFixed(2)}%</p>
      <Button variant="primary" onClick={handleModalOpen}>
        
        View Analysis
      </Button>
      </div>
      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Negotiation Analysis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Method Used: Jaccard Similarity Coefficient
          </p>
          <p>
            Likelihood of Convergence: {likelihood}
          </p>
          <div style={{ width: '300px', margin: 'auto' }}>
            <Doughnut data={chartData} />
          </div>
          {negotiationStatus !== 'pending' && (
            <p>
              Real World Result: {negotiationStatus === 'accepted' ? 'Converged' : 'Diverged'}
            </p>
          )}
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

export default NegotiationAnalysis;
