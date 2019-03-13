import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
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

      <div>
        Would you rather...
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' placeholder='Enter option One' name='optionOneText' value={optionOneText}
                 onChange={this.handleChangeText}/>
          Or
          <input type='text' placeholder='Enter option Two' name='optionTwoText' value={optionTwoText}
                 onChange={this.handleChangeText}/>

          <button className='btn' type='submit' disabled={optionOneText === '' || optionTwoText === ''}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);