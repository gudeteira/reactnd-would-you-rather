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

export default PrivateRoute;