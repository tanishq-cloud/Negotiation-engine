import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Info = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main >
      <div className="welcome">
       <h1>Welcome to Negotiation Engine</h1>
      <p>Empowering Smart Negotiations</p>

      <section>
        <h2>Overview</h2>
        <p>
          Negotiation Engine is a real-time chat-based application designed to streamline the negotiation process.
          Users can engage in chat discussions, propose offers, view negotiation details, and analyze the likelihood
          of offer acceptance using a similarity index.
        </p>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>Real-Time Chat: Engage in live chat discussions for negotiation.</li>
          <li>Offer Form: Propose new offers through a user-friendly form.</li>
          <li>Console Panel: Access a detailed console panel for negotiation history.</li>
          <li>Similarity Analysis: Calculate similarity indices for negotiation analysis.</li>
          <li>Firebase Integration: Utilize Firebase Realtime Database for seamless data synchronization.</li>
        </ul>
      </section>

      <section>
        <h2>How it Works</h2>
        <ol>
          <li>Authentication: Sign in using Google authentication to access negotiation features.</li>
          <li>Chat Interface: Engage in real-time chat discussions to finalize negotiation details.</li>
          <li>Offer Form: Propose new offers using the user-friendly offer form.</li>
          <li>Console Panel: View negotiation history, proposed offers, and counter offers.</li>
          <li>Similarity Analysis: Evaluate likelihood of offer acceptance using calculated similarity indices.</li>
        </ol>
      </section>

      <section>
        <h2>Development</h2>
        <p>
          The Negotiation Engine is developed using React.js, Firebase Realtime Database, and React Bootstrap.
          Explore the source code on GitHub and contribute to the project.
        </p>
      </section>
    </div>
    <div className="hello">
      <p>Sign in with Google to access the portal.</p>
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={GoogleSignin}
          alt="sign in with google"
          type="button"
        />
      </button></div>
    </main>
  );
};

export default Info;