import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleAnswerQuestion} from '../../actions/questions';
import Answered from './Answered';
import {formatQuestion} from './Question';
import UnAnswered from './UnAnswered';

class QuestionDetails extends Component {
  state = {
    toDetails: false
  };
  handleVote = (answer) => {

    const {dispatch, question, user} = this.props;
    dispatch(handleAnswerQuestion({user, id: question.id, answer}));
    this.setState(() => ({toDetails: true}));
  };

  render() {
    const {question} = this.props;

    return question.isAnswered
      ? <Answered question={question} currentUser={this.props.currentUser}/>
      : <UnAnswered question={question} handleVote={this.handleVote}/>;
  }
}

function mapStateToProps(state, props) {
  const {questions, users, login} = state;
  let question = questions[props.match.params.id];
  return {
    question: formatQuestion(question, users[question.author]) || null,
    user: login,
    currentUser: users[login]
  };
}

export default connect(mapStateToProps)(QuestionDetails);