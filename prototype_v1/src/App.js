import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import ChatBox from "./components/ChatBox";
import Info from "./components/Info";
import 'bootstrap/dist/css/bootstrap.min.css';
//import './bootstrap.min.css'

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <NavigationBar />
      {!user ? (
        <Info />
      ) : (
        <>
          <ChatBox />
        </>
      )}
    </div>
  );
}

export default App;