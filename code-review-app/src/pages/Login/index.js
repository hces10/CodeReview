import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../utils/base";
import { AuthContext } from '../../utils/Auth.js';
import firebase from "firebase/app";
import "firebase/auth";
import { FcGoogle } from "react-icons/fc";

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
      }).catch((error) => {
        console.log('error', error);
      });
      history.push("/");
    },
    [history]
  );

  const {currentUser} = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{
      position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ border: '1px solid #222', borderRadius: '15px', padding: '30px', minWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', margin: '10px 0 20px 0', color: '#444' }}>Login</h1>
        <form onSubmit={handleLogin}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button
              variant="primary" type="submit"
              style={{
                display: 'flex', flexDirection: 'row', backgroundColor: 'transparent',
                borderRadius: '15px', border: '1px solid #CCC',
                alignItems: 'center', padding: '10px 20px', cursor: 'pointer'
              }}
            >
              <FcGoogle style={{ marginRight: '8px', fontSize: '20px' }} />
              <p style={{ color: '#AAA', fontSize: '16px', margin: 0 }}>Sign In with Google</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);