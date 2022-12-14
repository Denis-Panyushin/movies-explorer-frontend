import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const value = React.useContext(AppContext);

  return (
    <Route>
      {() => (value.loggedIn ? value.checkToken && <Component {...props} /> : value.loggedIn === false && <Redirect exact to='/' />)}
    </Route>
  );
};

export default ProtectedRoute;