import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const state = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = state;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated !== null &&
        (isAuthenticated === true && !loading ? (
          <Component {...props} />
        ) : (
          <Redirect to='/signin' />
        ))
      }
    />
  );
};

export default PrivateRoute;
