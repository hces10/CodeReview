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
        <PrivateRoute exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
      </Router>
    </AuthProvider>
  );
}

export default App;
