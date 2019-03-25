import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Button, Divider, Dropdown, Form, Grid, Header, Image, Message, Segment, Tab} from 'semantic-ui-react';
import {login} from '../actions/login';
import {handleAddUser} from '../actions/users';
import SignUp from './SignUp';

class Login extends Component {

  static propTypes = {
    users: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  state = {
    loggedIn: false,
    error: false,
    showSignUpForm: false,
    username: '',
    password: ''
  };

  handleLogin = (e) => {
    e.preventDefault();
    if (this.state.username !== '') {
      this.login();
    } else {
      this.setState(() => ({error: true}));
    }
  };

  login = () => {
    const {users, dispatch} = this.props;
    const {username, password} = this.state;
    const user = users[username];
    if (user && this.matchPasswords(user.password, password)) {
      dispatch(login(username));
      this.setState(() => ({loggedIn: true}));
    } else {
      this.setState(() => ({error: true}));
    }
  };

  matchPasswords = (userPassword, password) => {
    if (userPassword) {
      return userPassword === password;
    }
    return true;
  };

  handleChangeUser = (e, {value}) => {
    e.preventDefault();
    const {users} = this.props;

    this.setState(() => ({
      error: value === '',
      username: value,
      password: users[value].password || ''
    }));
  };

  signUp = e => {
    e.preventDefault();
    this.setState(() => ({showSignUpForm: true}));
  };

  existsUser = username => {
    return this.props.users[username] !== undefined;
  };

  handleCloseSignUpForm = () => {
    this.setState(() => ({showSignUpForm: false}));
  };

  handleSignUp = (newUser) => {
    this.props.dispatch(handleAddUser(newUser));
    this.setState(() => ({showSignUpForm: false, error: false}));
  };

  handleChangeText = e => {
    const {name, value} = e.target;
    this.setState(() => ({
      [name]: value
    }));
  };

  optionItems = () => {
    const {users} = this.props;
    return Object.keys(users).map(id => {
      const user = users[id];
      return {
        key: user.id,
        text: user.name,
        value: user.id,
        image: {avatar: true, src: `${user.avatarURL}`},
      };
    });
  };

  panes = () => {
    const options = this.optionItems();
    return [
      {
        menuItem: {key: 'users', icon: 'users', content: 'Sign in as'},
        render: () =>
          <Tab.Pane className='no-border'>
            <Dropdown options={options}
                      onChange={this.handleChangeUser}
                      value={this.state.username}
                      placeholder='Sign in as ...'
                      icon='user' className='icon'
                      labeled fluid selection pointing button/>
          </Tab.Pane>
      },
      {
        menuItem: 'Username and password',
        render: () =>
          <Tab.Pane className='no-border left aligned'>
            <Form.Field required label='Username' control='input' placeholder='Your username'
                        name='username' value={this.state.username} autoComplete='off'
                        onChange={this.handleChangeText}/>
            <Form.Field label='Password' control='input' type='password' placeholder='Enter your password'
                        name='password' value={this.state.password} autoComplete='off'
                        onChange={this.handleChangeText}/>
          </Tab.Pane>
      }
    ];
  };

  renderLoginForm = () => {
    return (
      <div className='login-form'>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{maxWidth: 450}}>
            <Image src='/images/logo.svg'/>
            <Header as='h3' textAlign='center'>
              <p>Sign in to Would you rather</p>
            </Header>
            <Message negative hidden={!this.state.error}>
              <Message.Header>Incorrect username or password</Message.Header>
            </Message>
            <Form size='large' onSubmit={this.handleLogin}>
              <Segment>
                <Tab menu={{secondary: true, pointing: true}} panes={this.panes()}/>
                <Divider hidden/>
                <Button type='submit' color='blue' fluid size='large'>
                  Sign in
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='/signup' onClick={this.signUp}>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
        <SignUp open={this.state.showSignUpForm}
                close={this.handleCloseSignUpForm}
                existsUser={this.existsUser}
                handleSignUp={this.handleSignUp}/>
      </div>);
  };

  render() {
    const {loggedIn} = this.state;
    const {from} = this.props.location.state || {from: {pathname: '/'}};
    return (
      loggedIn ? <Redirect to={from}/> : this.renderLoginForm()
    );
  }
}

function mapStateToProps({users}) {
  return {
    users
  };
}

export default connect(mapStateToProps)(Login);