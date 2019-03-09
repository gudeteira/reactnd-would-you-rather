import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Item, Tab} from 'semantic-ui-react';
import Question from './Question';


class QuestionList extends Component {

  renderQuestions = (questions) => {
    return (<Item.Group divided>
      {questions.map(id => (
        <Question key={id} id={id}/>
      ))}
    </Item.Group>);
  };

  renderPanes({unAnsweredQuestions, answeredQuestions}) {
    return [
      {
        menuItem: 'Unanswered questions',
        render: () => <Tab.Pane attached={true}>{this.renderQuestions(unAnsweredQuestions)}</Tab.Pane>
      },
      {
        menuItem: 'Answered',
        render: () => <Tab.Pane attached={true}>{this.renderQuestions(answeredQuestions)}</Tab.Pane>
      },
    ];
  }

  render() {
    return (<Tab menu={{secondary: true, pointing: false}} panes={this.renderPanes(this.props)}/>);
  }
}

function mapStateToProps({questions}) {
  const answeredQuestions = sortQuestions(Object.keys(questions).filter(q => questions[q].answered), questions);
  const unAnsweredQuestions = sortQuestions(Object.keys(questions).filter(q => !questions[q].answered), questions);
  return {
    unAnsweredQuestions,
    answeredQuestions
  };

  function sortQuestions(keys, questions) {
    return keys.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  }
}

export default withRouter(connect(mapStateToProps)(QuestionList));