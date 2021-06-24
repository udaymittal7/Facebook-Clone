import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, ...rest }) => {
  const state = useSelector((state) => state.auth);
  const { isAuthenticated } = state;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated !== null &&
        (isAuthenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        ))
      }
    />
  );
};

export default PublicRoute;
