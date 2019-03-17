import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Button, Divider, Dropdown, Form, Grid, Header, Image, Segment, Label} from 'semantic-ui-react';
import {login} from '../actions/login';
import {getMyQuestions} from '../actions/questions';


class Login extends Component {
  state = {
    selectedUser: '',
    loggedIn: false,
    error: false
  };

  handleLogin = (e) => {
    e.preventDefault();
    if (this.state.selectedUser !== '') {
      const {questions, users} = this.props;
      this.props.dispatch(login(this.state.selectedUser));
      this.props.dispatch(getMyQuestions(questions, users[this.state.selectedUser]));
      this.setState(() => ({loggedIn: true}));
    } else {
      this.setState(() => ({error: true}));
    }
  };

  handleChangeUser = (e, {value}) => {
    e.preventDefault();
    this.setState(() => ({selectedUser: value, error: value === ''}));
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
                          placeholder='Select an user'
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
          </Grid.Column>
        </Grid>
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