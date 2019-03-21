import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Button, Divider, Dropdown, Form, Grid, Header, Image, Label, Message, Segment} from 'semantic-ui-react';
import {login} from '../actions/login';
import {getMyQuestions} from '../actions/questions';
import {addUser} from '../actions/users';
import SignUp from './SignUp';

class Login extends Component {
  state = {
    selectedUser: '',
    loggedIn: false,
    error: false,
    showSignUpForm: false
  };

  handleLogin = (e) => {
    e.preventDefault();
    if (this.state.selectedUser !== '') {
      this.login();
    } else {
      this.setState(() => ({error: true}));
    }
  };

  login = () => {
    const {questions, users} = this.props;
    this.props.dispatch(login(this.state.selectedUser));
    this.props.dispatch(getMyQuestions(questions, users[this.state.selectedUser]));
    this.setState(() => ({loggedIn: true}));
  };

  handleChangeUser = (e, {value}) => {
    e.preventDefault();
    this.setState(() => ({selectedUser: value, error: value === ''}));
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
    this.props.dispatch(addUser(newUser));
    this.setState({showSignUpForm: false, selectedUser: newUser.username, error: false});
    this.props.dispatch(login(newUser.username));
    this.setState({loggedIn: true});
  };

  optionItems = () => {
    return this.props.theUsers.map(u =>
      ({
        key: u.id,
        text: u.name,
        value: u.id,
        image: {avatar: true, src: `${u.avatarURL}`},
      })
    );
  };
  renderLoginForm = () => {
    const options = this.optionItems();
    return (
      <div className='login-form'>

        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{maxWidth: 450}}>
            <Image src='/images/logo.svg'/>
            <Header as='h3' textAlign='center'>
              <p>Sign in to Would you rather</p>
            </Header>
            <Form size='large' onSubmit={this.handleLogin}>
              <Segment>
                <Dropdown options={options}
                          onChange={this.handleChangeUser}
                          placeholder='Sign in as ...'
                          icon='user' className='icon'
                          labeled fluid selection pointing button
                />
                {
                  this.state.error
                  && <Label basic color='red' pointing>Please select an user</Label>
                }
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
    const {selectedUser, loggedIn} = this.state;
    const {from} = this.props.location.state || {from: {pathname: '/'}};
    return (
      loggedIn && selectedUser !== '' ? <Redirect to={from}/> : this.renderLoginForm()
    );
  }
}

function mapStateToProps({users, questions}) {
  const theUsers = Object.keys(users).map(userId => {
    return {
      id: userId,
      name: users[userId].name,
      avatarURL: users[userId].avatarURL
    };
  });
  return {
    theUsers,
    questions,
    users
  };
}

export default connect(mapStateToProps)(Login);