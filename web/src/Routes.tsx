import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const Routes: React.FC = () => {
  return <BrowserRouter>
  <header>
    <div className="links">
      <Link to={ '/' }>Home</Link>
      <Link to={ '/register' }>Register</Link>
      <Link to={ '/login' }>Login</Link>
    </div>
  </header>
  <Switch>
    <Route exact path={ '/' } component={ Home } />
    <Route exact path={ '/register' } component={ Register } />
    <Route exact path={ '/login' } component={ Login } />
  </Switch>
  </BrowserRouter>

} 
