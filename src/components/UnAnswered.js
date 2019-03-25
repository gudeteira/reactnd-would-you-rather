import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, Card, Icon, Image} from 'semantic-ui-react';
import AppPropTypes from '../utils/AppPropTypes';

export default class UnAnswered extends Component {
  static propTypes = {
    question: AppPropTypes.formattedQuestion.isRequired,
    handleVote: PropTypes.func.isRequired
  };

  handleVote = (e, answer) => {
    e.preventDefault();
    this.props.handleVote(answer);
  };

  renderCard = question => {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Meta className='right floated'><Icon name='calendar alternate outline'/>{question.date}</Card.Meta>

          <Image floated='left' src={question.avatar} alt={question.name} avatar/>
          <Card.Header>{question.name} asks:</Card.Header>
          <Card.Description>
            <h3 className='cinema'>Would you rather</h3>
            <Button.Group as='span'>
              <Button as='span' color='blue'
                      onClick={e => this.handleVote(e, 'optionOne')}>{question.optionOne.text}</Button>
              <Button.Or/>
              <Button as='span' color='teal'
                      onClick={e => this.handleVote(e, 'optionTwo')}>{question.optionTwo.text}</Button>
            </Button.Group>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  };

  render() {
    const {question} = this.props;
    return (
      this.renderCard(question)
    );
  }
}