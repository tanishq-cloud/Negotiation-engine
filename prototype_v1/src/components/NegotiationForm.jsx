import React, { useState } from 'react';
import {  where, query, getDocs, setDoc, arrayUnion, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function NegotiationForm({ onCancel, initialData }) {
  const [formData, setFormData] = useState(initialData?.negotiationData || {});
  //const [errors, setErrors] = useState({});
  console.log("NegotiationForm")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const negotiationData = {
        ...formData,
      };

    
    const negotiationIdCreater = () => {
      return new Date().getTime().toString();                             
  };
   

    if (initialData) {
      // If it's a counter-offer, update the existing document
      const query1 = query(collection(db, "negotiations"), where("negotiationId", "==", `${initialData.negotiationId}`));
      const querySnapshot = await getDocs(query1);
      const docRef = querySnapshot.docs[0].ref;
      const { uid, displayName, photoURL } = auth.currentUser;
      console.log("Negotiaition Id: "+initialData.negotiationId);
      await setDoc(docRef, {
        counterBy: arrayUnion({ uid, displayName, photoURL }),
        negotiationData: arrayUnion(negotiationData),
      }, { merge: true });
      console.log("Offer Updated")

    
    await addDoc(collection(db, 'messages'), {
      type: 'negotiation',
      name: displayName,
      avatar: photoURL,
      negotiationData,
      negotiationId : initialData.negotiationId,// Use the same negotiation ID
      status: 'pending',
      uid,
      createdAt: serverTimestamp(),
    });
    console.log('Counter Form submitted successfully.');
  
    } else { 
            
      const negotiationId = negotiationIdCreater();
      console.log('Newly Generated negotiation ID:'+ negotiationId);
      // If it's an initial offer, create a new document
      const { uid, displayName, photoURL } = auth.currentUser;
      await addDoc(collection(db, 'negotiations'), {
        type: 'negotiation',
        offerName : negotiationData.Product,
        name: displayName,
        avatar: photoURL,
        counterBy: 'Open',
        negotiationData : arrayUnion(negotiationData),
        negotiationId, // Use the generated negotiation ID
        status: 'pending',
        uid,
        createdAt: serverTimestamp(),
      });
    // Add a new message document with the same negotiation ID
    await addDoc(collection(db, 'messages'), {
      type: 'negotiation',
      name: displayName,
      avatar: photoURL,
      negotiationData,
      negotiationId,// Use the same negotiation ID
      status: 'pending',
      uid,
      createdAt: serverTimestamp(),
    });
    console.log('New Negotiation submitted successfully.');
  }

  
    
    onCancel(); // Close the form after submission
    } catch (error) {
      console.error('Error saving negotiation data:', error);
    }
  };

  return (
    <Form onSubmit={onSubmit} className="container mt-4">
      <Form.Group className="mb-3">
        <Form.Label>Product</Form.Label>
        <Form.Control
          type="text"
          name="Product"
          placeholder="Product"
          value={formData.Product || ''}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="Price"
          placeholder="Price"
          value={formData.Price || ''}
          onChange={handleChange}
          required
          min="1"
        />
      </Form.Group>
      <Form.Group className="mb-3">
  <Form.Label>Quantity</Form.Label>
  <Form.Control
    type="number"
    name="Quantity"
    placeholder="Quantity"
    value={formData.Quantity || ''}
    onChange={handleChange}
    required
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label>Warranty</Form.Label>
  <Form.Control
    type="month"
    name="Warranty"
    placeholder="Warranty"
    value={formData.Warranty || ''}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label>Discount</Form.Label>
  <Form.Control
    type="number"
    name="Discount"
    placeholder="Discount"
    value={formData.Discount || ''}
    onChange={handleChange}
   
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label>Buyer's Finder Fee</Form.Label>
  <Form.Control
    type="number"
    name="BuyersFinderFee"
    placeholder="Buyer's Finder Fee"
    value={formData["BuyersFinderFee"] || ''}
    onChange={handleChange}
    required
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label>Commission</Form.Label>
  <Form.Control
    type="number"
    name="Commission"
    placeholder="Commission in percentage"
    value={formData.Commission || ''}
    onChange={handleChange}
    required
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label>Settlement Window</Form.Label>
  <Form.Control
    type="time"
    name="SettlementWindow"
    placeholder="Settlement Window"
    value={formData["SettlementWindow"] || ''}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label>Settlement Cycle</Form.Label>
  <Form.Control
    type="time"
    name="SettlementCycle"
    placeholder="Settlement Cycle"
    value={formData["SettlementCycle"] || ''}
    onChange={handleChange}
  />
</Form.Group>

      <div className="mb-3">
        {/* <Button variant="secondary" className="me-2" onClick={handleCounterOffer}>
          Counter Offer
        </Button>
        <Button variant="success" className="me-2" onClick={handleAcceptOffer}>
          Accept
        </Button> */}
        <Button variant="danger" className="me-2" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Propose Offer
        </Button>
      </div>
      



    </Form>
  );
}
