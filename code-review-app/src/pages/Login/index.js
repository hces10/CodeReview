import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../utils/base";
import { AuthContext } from '../../utils/Auth.js';
import { GoogleLogin } from 'react-google-login';
import firebase from "firebase/app";
import "firebase/auth";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();

      const provider = new firebase.auth.GoogleAuthProvider();
      app.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        console.log('credential', credential);
        // var token = credential.accessToken;
        // var user = result.user;
      }).catch((error) => {
        console.log('error', error);
      });
      history.push("/");

    //   const { email, password } = event.target.elements;
    //   try {
    //     await app
    //       .auth()
    //       .signInWithEmailAndPassword(email.value, password.value);
    //     
    //   } catch (error) {
    //     alert(error);
    //   }
    },
    [history]
  );
  

  // const handleLogin = async googleData => {
  //   const res = await fetch("http://localhost:3333/api/v1/auth/google", {
  //       method: "POST",
  //       body: JSON.stringify({
  //       token: googleData.tokenId
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   const data = await res.json()
  //   console.log('data', data);
  // }

  const {currentUser} = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{
      position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ border: '1px solid #000', borderRadius: '15px', padding: '30px', minWidth: '400px' }}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name='email' type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control name='password' type="password" placeholder="Senha" />
          </Form.Group> */}

          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button variant="primary" type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);