import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Icon, Item} from 'semantic-ui-react';
import {handleAnswerQuestion} from '../../actions/questions';
import {formatDate} from '../../utils/api';

class Question extends Component {

  handleVote = (e, answer) => {
    e.preventDefault();
    const {dispatch, question, user} = this.props;
    dispatch(handleAnswerQuestion({user, id: question.id, answer}));
  };

  summarize = text => {
    const words = text.split(' ');
    return `${words[0]} ${words[1]}...`;
  };

  render() {
    const {question} = this.props;
    console.log(question);
    return (

      <Item as={Link} to={`/question/${question.id}`}>
        <Item.Image src={question.avatar} alt={question.name}/>
        <Item.Content>
          <Item.Header>{question.name} on <Icon inverted color='blue' name='time'/>{question.date} asks:</Item.Header>
          <Item.Meta>
            <h3 className='cinema'>Would you rather</h3>
          </Item.Meta>
          <Item.Description>
            {this.summarize(question.optionOne.text)} or {this.summarize(question.optionTwo.text)}
          </Item.Description>
        </Item.Content>
      </Item>

    );
  }
}

export function formatQuestion(question, author = {}, login) {
  const {timestamp} = question;
  const {name, avatarURL} = author;
  console.log(question);
  return {
    name,
    date: formatDate(timestamp),
    avatar: avatarURL,
    ...question

  };
}

function mapStateToProps(state, props) {
  console.log(state);
  const {questions, users, login} = state;
  let question = questions[props.id] || questions[props.match.params.id];
  return {
    question: formatQuestion(question, users[question.author]) || null,
    user: login
  };
}

export default connect(mapStateToProps)(Question);