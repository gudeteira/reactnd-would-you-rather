import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Card, Icon, Image} from 'semantic-ui-react';
import {formatDate} from '../utils/api';
import AppPropTypes from '../utils/AppPropTypes';

class Question extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    question: AppPropTypes.formattedQuestion
  };

  summarize = text => {
    const words = text.split(' ');
    return `${words[0]} ${words[1] || ''}...`;
  };

  render() {
    const {question} = this.props;
    return (
      <Card as={Link} to={`/question/${question.id}`}>
        <Card.Content>
          <Image floated='left' src={question.avatar} alt={question.name} avatar/>
          <Card.Header>{question.name} asks:</Card.Header>
          <Card.Meta>on <Icon name='calendar alternate outline'/>{question.date}</Card.Meta>
          <Card.Description>
            <h3 className='cinema'>Would you rather</h3>
            {this.summarize(question.optionOne.text)} or {this.summarize(question.optionTwo.text)}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export function formatQuestion(question, author = {}) {
  const {timestamp} = question;
  const {name, avatarURL} = author;
  return {
    name,
    date: formatDate(timestamp),
    avatar: avatarURL,
    ...question
  };
}

function mapStateToProps(state, props) {
  const {questions, users, login} = state;
  let question = questions[props.id] || questions[props.match.params.id];
  return {
    question: formatQuestion(question, users[question.author]) || null,
    user: login
  };
}

export default connect(mapStateToProps)(Question);