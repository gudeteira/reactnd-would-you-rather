import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Button, Form, Segment} from 'semantic-ui-react';
import {handleAddQuestion} from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    isCompleted: false,
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const {optionOneText, optionTwoText} = this.state;
    this.props.dispatch(handleAddQuestion({optionOneText, optionTwoText}));
    this.setState(() => ({isCompleted: true}));
  };
  handleChangeText = e => {
    const {name, value} = e.target;
    this.setState(() => ({[name]: value}));
  };

  render() {
    const {isCompleted, optionOneText, optionTwoText} = this.state;
    if (isCompleted) {
      return <Redirect to="/"/>;
    }
    return (
      <Segment>
        <h3>Would you rather...</h3>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group widths={2}>
            <Form.Field required label='Option one' control='input' placeholder='Enter option One' name='optionOneText'
                        onChange={this.handleChangeText}/>
            <Form.Field required label='Option two' control='input' placeholder='Enter option Two' name='optionTwoText'
                        onChange={this.handleChangeText}/>
          </Form.Group>
          <Button type='submit'
                  disabled={optionOneText === '' || optionTwoText === ''}>Submit</Button>
        </Form>
      </Segment>
    );
  }
}

export default connect()(NewQuestion);