import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logout} from '../actions/login';

class Logout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.props.dispatch(logout());
  }

  render() {
    return <Redirect to='/login'/>;
  }
}

export default connect()(Logout);