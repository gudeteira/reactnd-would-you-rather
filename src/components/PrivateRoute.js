import PropTypes from 'prop-types';
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Layout from './Layout';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (

  <Route {...rest} render={(props) => {
    return (
      isAuthenticated
        ? <Layout><Component {...props} /></Layout>
        : <Redirect to={{
          pathname: '/login',
          state: {from: props.location}
        }}/>
    );
  }}/>
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;