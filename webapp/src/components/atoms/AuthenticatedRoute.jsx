import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = (props) => {
  return <Route {...props} render={() => (props.token ? props.children : <Redirect to="/sign-in" />)} />;
};

export { AuthenticatedRoute };
