import React from 'react';
import {NavLink} from 'react-router-dom';

const NotFound = () => (
  <div>
    <h3>It seems that what you are looking for is not here!</h3>
    Go back to <NavLink to='/'>Home</NavLink>

  </div>
);

export default NotFound;