import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Login from './components/Login';

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Layout>
    </Router>
  )
}
