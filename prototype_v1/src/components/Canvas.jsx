import { useState, useEffect } from 'react';
import {Button, Tab, Tabs, Offcanvas} from 'react-bootstrap';
import NegotiationListRenderer from './NegotiationListRenderer';
import { onSnapshot, orderBy, limit,  collection,  query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { DiGoogleAnalytics } from "react-icons/di";

function Canvas() {
  const [show, setShow] = useState(false);
  const [user] = useAuthState(auth);
  const [negotiations, setNegotiations] = useState([]);
  const [key, setKey] = useState('yourOffer');
  const [counterOffer, setCounterOffer] = useState([]);
   

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Update data in realtime
  useEffect(() => {
    const unsubscribeNegotiations = onSnapshot(
      query(
        collection(db, 'negotiations'),
        where('uid', '==', `${user.uid}`),
        orderBy('createdAt', 'desc'),
        limit(50)
      ),
      (snapshot) => {
        const fetchedNegotiations = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const sortedNegotiations = fetchedNegotiations.sort((a, b) => b.createdAt - a.createdAt);
        setNegotiations(sortedNegotiations);
      },
      (error) => {
        console.error('Error fetching negotiations:', error);
      }
    );

    const unsubscribeCounterOffers = onSnapshot(
      query(
        collection(db, 'negotiations'),
        where('counterBy', 'array-contains', `${user.uid}`),
        orderBy('createdAt', 'desc'),
        limit(50)
      ),
      (snapshot) => {
        const fetchedCounterOffers = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const sortedCounterOffers = fetchedCounterOffers.sort((a, b) => b.createdAt - a.createdAt);
        setCounterOffer(sortedCounterOffers);
      },
      (error) => {
        console.error('Error fetching counter offers:', error);
      }
    );

    return () => {
      unsubscribeNegotiations();
      unsubscribeCounterOffers();
    };
  }, [user]);

  // const fetchNegotiations = async () => {
  //   try {
  //     const currentUserUID = user.uid;
  //     const querySnapshot = await getDocs(
  //       query(
  //         collection(db, 'negotiations'),
  //         where('uid', '==', `${currentUserUID}`),
  //         //where('counterBy.uid', '==', ''),
  //         orderBy('createdAt', 'desc'),
  //         limit(50)
  //       )
  //     );

  //     const querySnapshot1 = await getDocs(
  //       query(
  //         collection(db, 'negotiations'),
  //         where('counterBy', 'array-contains',`${currentUserUID}` ),
  //         orderBy('createdAt', 'desc'),
  //         limit(50)
  //       )
  //     );

  //     const fetchedNegotiations = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));

  //     const fetchedCounterOffers = querySnapshot1.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));

  //     const sortedNegotiations = fetchedNegotiations.sort((a, b) => b.createdAt - a.createdAt);
  //     const sortedCounterOffers = fetchedCounterOffers.sort((a, b) => b.createdAt - a.createdAt);
  //     setNegotiations(sortedNegotiations);
  //     setCounterOffer(sortedCounterOffers);
  //   } catch (error) {
  //     console.error('Error fetching negotiations:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchNegotiations();
  //   // eslint-disable-next-line
  // }, [user]);

  //console.log(negotiations);

  const onNegotiationClick = (negotiation) => {
    console.log('Clicked on negotiation:', negotiation);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Console<DiGoogleAnalytics size={20}/>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Console</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="yourOffer" title="Your Offer">
        <Offcanvas.Header>
          Here you can see your proposed offers.
        </Offcanvas.Header>
        <NegotiationListRenderer negotiations={negotiations} onNegotiationClick={onNegotiationClick} />
      </Tab>
      <Tab eventKey="counterOffer" title="Counter Offer">
        Here you can see your counter offer.
        <NegotiationListRenderer negotiations={counterOffer} onNegotiationClick={onNegotiationClick} /> 
      </Tab>
      </Tabs>
         
        </Offcanvas.Body>
      </Offcanvas>

      
     
    </>
  );
}

export default Canvas;