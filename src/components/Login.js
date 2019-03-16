import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../actions/login';
import {getMyQuestions} from '../actions/questions';


class Login extends Component {
  state = {
    selectedUser: '',
    loggedIn: false
  };

  handleLogin = (e) => {
    e.preventDefault();
    if (this.state.selectedUser !== '') {
      const {questions, users} = this.props;
      this.props.dispatch(login(this.state.selectedUser));
      this.props.dispatch(getMyQuestions(questions, users[this.state.selectedUser]));
      this.setState(() => ({loggedIn: true}));
    } else {
      alert('you must select an user');
    }
  };

  handleChangeUser = (e) => {
    e.preventDefault();
    const selectedUser = e.target.value;
    this.setState(() => ({selectedUser}));
  };

  renderLoginForm = () => {
    const {theUsers} = this.props;
    return <div>
      <form onSubmit={this.handleLogin}>
        <h1>Sign in to Would you rather</h1>
        <select placeholder='Select an user' onChange={this.handleChangeUser}>
          <option value=''>Select an user</option>
          {theUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        <button type='submit'>Sign in</button>
      </form>
    </div>;
  };

  render() {
    const {selectedUser, loggedIn} = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    return (
      loggedIn && selectedUser !== '' ? <Redirect to={from} /> : this.renderLoginForm()
    );
  }
}

function mapStateToProps({users, questions}) {
  const theUsers = Object.keys(users).map(userId => {
    return {
      id: userId,
      name: users[userId].name
    };
  });
  return {
    theUsers,
    questions,
    users
  };
}

export default connect(mapStateToProps)(Login);