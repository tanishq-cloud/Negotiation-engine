import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NegotiationListRenderer from './NegotiationListRenderer';
import { orderBy, limit,  collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

function Canvas() {
  const [show, setShow] = useState(false);
  const [user] = useAuthState(auth);
  const [negotiations, setNegotiations] = useState([]);
   

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchNegotiations = async () => {
    try {
      const currentUserUID = user.uid;
      const querySnapshot = await getDocs(
        query(
          collection(db, 'negotiations'),
          where('uid', '==', `${currentUserUID}`),
          orderBy('createdAt', 'desc'),
          limit(50)
        )
      );

      const fetchedNegotiations = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const sortedNegotiations = fetchedNegotiations.sort((a, b) => a.createdAt - b.createdAt);
      setNegotiations(sortedNegotiations);
    } catch (error) {
      console.error('Error fetching negotiations:', error);
    }
  };

  useEffect(() => {
    fetchNegotiations();
    // eslint-disable-next-line
  }, [user]);

  console.log(negotiations);

  const onNegotiationClick = (negotiation) => {
    console.log('Clicked on negotiation:', negotiation);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Console
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Console</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <NegotiationListRenderer negotiations={negotiations} onNegotiationClick={onNegotiationClick} /> 
        </Offcanvas.Body>
      </Offcanvas>

      
     
    </>
  );
}

export default Canvas;