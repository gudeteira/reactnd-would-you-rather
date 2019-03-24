import React from 'react';
import {NavLink} from 'react-router-dom';
import {Container, Segment} from 'semantic-ui-react';

const NotFound = () => (
  <Container className='no-border'>
    <Segment className='no-border'>
  <div>
    <h3>It seems that what you are looking for is not here!</h3>
    Go back to <NavLink to='/'>Home</NavLink>

  </div>
    </Segment>
  </Container>
);

export default NotFound;