import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NegotiationList from './NegotiationList';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db, auth } from '../firebase';

function Canvas() {
  const [show, setShow] = useState(false);
//   const [negotiations, setNegotiations] = useState([]);
//   const [loading, setLoading] = useState(true); // Add a loading state variable

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   useEffect(() => {
//     // Fetch negotiations data from Firebase Firestore
//     const fetchNegotiations = async () => {
//       try {
//         const q = query(collection(db, 'negotiations'), where('uid', '==', auth.currentUser.uid));
//         const querySnapshot = await getDocs(q);
//         const negotiationsData = querySnapshot.docs.map((doc) => doc.data());
//         setNegotiations(negotiationsData);
//         setLoading(false); // Set loading to false once the data has been fetched
//       } catch (error) {
//         console.error('Error fetching negotiations:', error);
//       }
//     };

//     // Check if the component is mounting for the first time
//     if (!loading) {
//       fetchNegotiations();
//     }
//   }, [loading]); // Run the effect only when the loading state changes

//   console.log('negotiations:', negotiations);

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
          
            <NegotiationList  />
         
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Canvas;