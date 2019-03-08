import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Button, Container, Item} from 'semantic-ui-react';
import {formatDate} from '../utils/api';

class Question extends Component {

  render() {
    const {question} = this.props;
    return (
      <Item>
        <Item.Image src={question.avatar} alt={question.name}/>
        <Item.Content>
          <Item.Header>{question.name} on {question.date} asks:</Item.Header>
          <Item.Meta>
            <h3 className='cinema'>Would you rather</h3>
          </Item.Meta>
          <Item.Description>
            <Container text style={{marginTop: '2em'}}>
              <Button.Group as='span'>
                <Button as='span' color='blue'>{question.optionOne}</Button>
                <Button.Or/>
                <Button as='span' color='teal'>{question.optionOne}</Button>
              </Button.Group>
            </Container>
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}

export function formatQuestion(question, author = {}, login) {
  const {id, optionOne, optionTwo, timestamp} = question;
  const {name, avatarURL} = author;
  return {
    name,
    id,
    date: formatDate(timestamp),
    avatar: avatarURL,
    optionOne: optionOne.text,
    optionTwo: optionTwo.text
  };
}

function mapStateToProps({questions, users, login}, {id}) {
  const question = questions[id];
  return {
    question: formatQuestion(question, users[question.author]) || null
  };
}

export default connect(mapStateToProps)(Question);