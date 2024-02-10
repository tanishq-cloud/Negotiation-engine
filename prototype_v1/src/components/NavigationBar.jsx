import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Canvas from "./Canvas";
//import CurrentNegotiationAnalysis from "./CurrentNegotiationAnalysis";
import {Row,Col, Button} from 'react-bootstrap';


const NavigationBar = () => {
  const [user] = useAuthState(auth);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="nav-bar">
      
    <h1>Negotiation Engine</h1><span style={{ fontSize: '14px', fontWeight: 'bold', color: '#555' }} >prototype_v1</span>
        {user ? (
        <>
        <Row>
          <Col>
          
          <Canvas/>
          
          </Col> 
          {/* <Col><CurrentNegotiationAnalysis /></Col> */}
        </Row>
        
        
        <Button onClick={signOut} className="sign-out" variant='outline-primary'>
          Sign Out
        </Button>
        </>
      ) : (
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      )}
      </nav>
  );
};

export default NavigationBar;