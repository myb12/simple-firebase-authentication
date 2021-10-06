import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

initializeAuthentication();

const provider = new GoogleAuthProvider();



function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }


  return (
    <div className="App">
      <button onClick={handleSignIn}>Sign in with google</button>
      <br />
      <button onClick={handleSignOut}>Sign Out</button>
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
