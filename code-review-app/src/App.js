import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, Login } from './pages';
import { AuthProvider } from './utils/Auth';
import PrivateRoute from './utils/PrivateRouter';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ height: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
        </div>
      </Router>
    </AuthProvider>   
  );
}

export default App;
