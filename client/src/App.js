import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import {loadUser} from "./redux/actions/authAction";

import PublicRoute from "./utils/PublicRoute";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    loadUser()
  }, [localStorage.token]);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PublicRoute exact path='/signin' component={SignIn} />
          <PublicRoute exact path='/signup' component={SignUp} />
          <PublicRoute exact path='/forgotPassword' component={ForgotPassword} />
          <PublicRoute exact path='/resetPassword/:token' component={ResetPassword} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
