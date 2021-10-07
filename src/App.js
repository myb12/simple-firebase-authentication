import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

initializeAuthentication();

const provider = new GoogleAuthProvider();



function App() {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false)
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

  const handleRegistration = (e) => {
    e.preventDefault();
  }



  return (
    <div className="App">
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <br />
      <Container>
        <Form onSubmit={handleRegistration} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3 check-box" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="success" type="submit" className="me-2">
            {
              isLogin ? 'Log in' : 'Register'
            }
          </Button>
          <Button onClick={handleSignIn} variant="warning" className="me-2">
            Sign in with google
          </Button>
          <Button onClick={handleSignOut} variant="danger" className="me-2">
            Sign Out
          </Button>
        </Form>
      </Container>

    </div>
  );
}

export default App;
