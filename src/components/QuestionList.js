import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Card, Message, Tab} from 'semantic-ui-react';
import {getMyQuestions} from '../actions/questions';
import Question from './question/Question';

class QuestionList extends Component {

  state = {
    loaded: false
  };
  componentDidMount() {
    const {dispatch, questions, user} = this.props;
    dispatch(getMyQuestions(questions, user));
    this.setState(()=> ({
      loaded: true
    }));
  }

  renderQuestions = (questions, emptyMessage) => {
    return (
      questions.length === 0
        ? emptyMessage
        : <Card.Group>
          {questions.map(id => (
            <Question key={id} id={id}/>
          ))}
        </Card.Group>
    );
  };

  emptyMessageUnanswered = () => <Message success header='Congratulations, you answered all questions!'
                                          content='You may now add a new question'/>;

  answeredEmptyMessage = () => <Message info header='You have not answered any questions yet!'
                                        content='Maybe you want to answer some question.'/>;

  sortQuestions = (keys, questions) => {
    return keys.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  };

  renderPanes() {
    const {questions} = this.props;
    const answeredQuestions = this.sortQuestions(Object.keys(questions).filter(q => questions[q].isAnswered), questions);
    const unAnsweredQuestions = this.sortQuestions(Object.keys(questions).filter(q => !questions[q].isAnswered), questions);

    return [
      {
        menuItem: 'Unanswered questions',
        render: () => <Tab.Pane
          as='div'>{this.renderQuestions(unAnsweredQuestions, this.emptyMessageUnanswered())}</Tab.Pane>
      },
      {
        menuItem: 'Answered',
        render: () => <Tab.Pane
          as='div'>{this.renderQuestions(answeredQuestions, this.answeredEmptyMessage())}</Tab.Pane>
      },
    ];
  }

  render() {
    return (<Tab menu={{secondary: true}} panes={this.renderPanes()}/>);
  }
}

function mapStateToProps({questions, users, login}) {
  return {
    questions,
    user: users[login]
  };
}

export default withRouter(connect(mapStateToProps)(QuestionList));