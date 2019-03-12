import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Item, Tab, Message} from 'semantic-ui-react';
import Question from './question/Question';


class QuestionList extends Component {

  renderQuestions = (questions, emptyMessage) => {
    return (
      questions.length === 0
        ? emptyMessage
        : <Item.Group divided>
          {questions.map(id => (
            <Question key={id} id={id}/>
          ))}
        </Item.Group>
    );
  };

  emptyMessageUnanswered = () => <Message success header='Congratulations, you answered all questions!'
                                          content='You may now add a new question'/>;

  answeredEmptyMessage = () => <Message info header='You have not answered any questions yet!'
                                        content='Maybe you want to answer some question.'/>;

  renderPanes({unAnsweredQuestions, answeredQuestions}) {

    return [
      {
        menuItem: 'Unanswered questions',
        render: () => <Tab.Pane attached={true}>{this.renderQuestions(unAnsweredQuestions, this.emptyMessageUnanswered())}</Tab.Pane>
      },
      {
        menuItem: 'Answered',
        render: () => <Tab.Pane attached={true}>{this.renderQuestions(answeredQuestions, this.answeredEmptyMessage())}</Tab.Pane>
      },
    ];
  }

  render() {
    return (<Tab menu={{text: true , pointing: true}} panes={this.renderPanes(this.props)}/>);
  }
}

function mapStateToProps({questions}) {
  const answeredQuestions = sortQuestions(Object.keys(questions).filter(q => questions[q].isAnswered), questions);
  const unAnsweredQuestions = sortQuestions(Object.keys(questions).filter(q => !questions[q].isAnswered), questions);
  return {
    unAnsweredQuestions,
    answeredQuestions
  };

  function sortQuestions(keys, questions) {
    return keys.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  }
}

export default withRouter(connect(mapStateToProps)(QuestionList));