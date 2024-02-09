import React, { useState, useEffect } from 'react';
import NegotiationAnalysis from './NegotiationAnalysis';
import { orderBy, limit,  collection, getDocs, query, where } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { db, auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
const CurrentNegotiationAnalysis = ({ currentUserUID }) => {
    const [user] = useAuthState(auth);
    const [showOffCanvas, setShow] = useState(false); 
    const [currentNegotiation, setNegotiation] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchNegotiations = async () => {
        try {
            const currentUserUID = user.uid;
        const querySnapshot = await getDocs(
            query(
            collection(db, 'negotiations'),
            where('uid', '==', `${currentUserUID}`),
            where('status','==','pending'),
            orderBy('createdAt', 'desc'),
            limit(50)
            )
        );

        const fetchedNegotiation = querySnapshot.docs[0].data()   

        setNegotiation(fetchedNegotiation);
        } catch (error) {
        console.error('Error fetching negotiations:', error);
        }
    };

    useEffect(() => {
        fetchNegotiations();
        // eslint-disable-next-line
    }, [user]);
    console.log(currentNegotiation);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
         Analysis
      </Button>

      <Offcanvas show={showOffCanvas} onHide={handleClose} placement="top" scroll={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Current offer Analysis</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NegotiationAnalysis
                negotiationData={currentNegotiation}
                negotiationStatus={"pending"}
            />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CurrentNegotiationAnalysis;
