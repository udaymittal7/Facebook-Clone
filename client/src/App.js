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

import PublicRoute from './utils/PublicRoute';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';
import LoadUser from './utils/LoadUser';
import Profile from './pages/profile/Profile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <LoadUser />
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/profile/:id' component={Profile} />
          <PublicRoute exact path='/signin' component={SignIn} />
          <PublicRoute exact path='/signup' component={SignUp} />
          <PublicRoute
            exact
            path='/forgotPassword'
            component={ForgotPassword}
          />
          <PublicRoute
            exact
            path='/resetPassword/:token'
            component={ResetPassword}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
