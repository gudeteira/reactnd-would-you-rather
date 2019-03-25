import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, Form, Label, Modal} from 'semantic-ui-react';
import {isBlank} from '../utils/api';


class SignUp extends Component {

  static propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    existsUser: PropTypes.func.isRequired
  };

  state = {
    open: false,
    username: '',
    usernameError: '',
    firstName: '',
    lastName: '',
    password: ''
  };

  close = () => {
    this.setState(() => ({
      open: false,
      username: '',
      usernameError: '',
      firstName: '',
      lastName: '',
      password: ''
    }));
    this.props.close();
  };

  handleChangeText = e => {
    const {name, value} = e.target;
    if ('username' === name) {
      this.setState(() => ({usernameError: ''}));
      if (value.indexOf(' ') !== -1) {
        this.setState(() => ({usernameError: 'Blank spaces are not allowed in username '}));
      } else if (this.props.existsUser(value)) {
        this.setState(() => ({usernameError: 'That username is taken!'}));
      }
      if (this.state.usernameError) {
        return false;
      }
    }
    this.setState(() => ({
      [name]: value
    }));
  };

  isDisabledSubmit = () => {
    return isBlank(this.state.username) ||
      !isBlank(this.state.usernameError) ||
      isBlank(this.state.firstName) ||
      isBlank(this.state.lastName) ||
      isBlank(this.state.password);
  };


  handleFormSubmit = e => {
    e.preventDefault();
    const {username, firstName, lastName, password} = this.state;
    this.props.handleSignUp({
      username,
      id: username,
      name: `${firstName} ${lastName}`,
      password
    });
  };

  render() {
    return (
      <Modal size='tiny' dimmer='blurring' open={this.props.open} closeOnEscape={false}
             closeOnDimmerClick={false}>
        <Modal.Header>Create your account</Modal.Header>
        <Modal.Content>
          <Form id='signUpForm' onSubmit={this.handleFormSubmit}>
            {
              this.state.usernameError
              && <Label basic color='red' pointing='below'>{this.state.usernameError}</Label>
            }
            <Form.Field required label='Username' control='input' placeholder='Your username'
                        name='username' autoComplete='off'
                        onChange={this.handleChangeText}/>

            <Form.Field required label='First name' control='input' placeholder='First name'
                        name='firstName' autoComplete='off'
                        onChange={this.handleChangeText}/>
            <Form.Field required label='Last name' control='input' placeholder='Last name'
                        name='lastName' autoComplete='off'
                        onChange={this.handleChangeText}/>
            <Form.Field required label='Password' control='input' type='password'
                        name='password' autoComplete='off'
                        onChange={this.handleChangeText}/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.close}>
            Cancel
          </Button>
          <Button
            form='signUpForm'
            type='submit'
            positive
            icon='checkmark'
            labelPosition='right'
            content="Sign Up"
            disabled={this.isDisabledSubmit()}
          />
        </Modal.Actions>
      </Modal>);
  }
}

export default SignUp;