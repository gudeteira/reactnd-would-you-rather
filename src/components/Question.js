import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Container, Item} from 'semantic-ui-react';
import {handleAnswerQuestion} from '../actions/questions';
import {formatDate} from '../utils/api';

class Question extends Component {

  handleVote = (e, answer) => {
    e.preventDefault();
    const {dispatch, question, user} = this.props;
    dispatch(handleAnswerQuestion({user, id: question.id, answer}));
  };

  render() {
    const {question} = this.props;
    return (

      <Item as={Link} to={`/question/${question.id}`}>
        <Item.Image src={question.avatar} alt={question.name}/>
        <Item.Content>
          <Item.Header>{question.name} on {question.date} asks:</Item.Header>
          <Item.Meta>
            <h3 className='cinema'>Would you rather</h3>
          </Item.Meta>
          <Item.Description>
            <Container text style={{marginTop: '2em'}}>
              <Button.Group as='span'>
                <Button as='span' color='blue'
                        onClick={e => this.handleVote(e, 'optionOne')}>{question.optionOne}</Button>
                <Button.Or/>
                <Button as='span' color='teal'
                        onClick={e => this.handleVote(e, 'optionTwo')}>{question.optionTwo}</Button>
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