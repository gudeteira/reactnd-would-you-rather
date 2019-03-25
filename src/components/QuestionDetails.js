import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {handleAnswerQuestion} from '../actions/questions';
import AppPropTypes from '../utils/AppPropTypes';
import Answered from './Answered';
import {formatQuestion} from './Question';
import UnAnswered from './UnAnswered';

class QuestionDetails extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired,
      url: PropTypes.string,
      path: PropTypes.string
    }),
    user: PropTypes.string.isRequired,
    question: AppPropTypes.formattedQuestion.isRequired,
    currentUser: AppPropTypes.user.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleVote = (answer) => {
    const {dispatch, question, user} = this.props;
    dispatch(handleAnswerQuestion({user, id: question.id, answer}));
  };

  render() {
    const {question} = this.props;

    if (null === question) {
      return <Redirect to="/404"/>;
    }

    return question.isAnswered
      ? <Answered question={question} currentUser={this.props.currentUser}/>
      : <UnAnswered question={question} handleVote={this.handleVote}/>;
  }
}

function mapStateToProps(state, props) {
  const {questions, users, login} = state;
  let question = questions[props.match.params.id];
  return {
    question: question ? formatQuestion(question, users[question.author]) : null,
    user: login,
    currentUser: users[login]
  };
}

export default connect(mapStateToProps)(QuestionDetails);