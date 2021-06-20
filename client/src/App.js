import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Login from './components/login/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' p component={SignUp} />
      </Switch>
    </Router>
  );
};

export default App;
