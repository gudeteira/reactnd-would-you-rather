import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/login';


class Login extends Component {
  state = {
    selectedUser: ''
  };

  handleLogin = (e) => {
    e.preventDefault();
    if (this.state.selectedUser !== '') {
      this.props.dispatch(login(this.state.selectedUser));
    } else {
      alert('you must select an user');
    }

  };

  handleChangeUser = (e) => {
    e.preventDefault();
    const selectedUser = e.target.value;
    this.setState(() => ({selectedUser}));
  };

  render() {
    const {users} = this.props;
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <h1>Sign in to Would you rather</h1>
          <select placeholder='Select an user' onChange={this.handleChangeUser}>
            <option value=''>Select an user</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <button type='submit'>Sign in</button>
        </form>

      </div>
    );
  }
}

function mapStateToProps({users}) {
  const theUsers = Object.keys(users).map(userId => {
    return {
      id: userId,
      name: users[userId].name
    };
  });
  return {
    users: theUsers
  };
}

export default connect(mapStateToProps)(Login);