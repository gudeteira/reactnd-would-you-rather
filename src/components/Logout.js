import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logout} from '../actions/login';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(logout());
  }

  render() {
    return <Redirect to='/login'/>;
  }
}

export default connect()(Logout);