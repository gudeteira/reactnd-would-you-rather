import React, {Component} from 'react';
import {Button, Item} from 'semantic-ui-react';

export default class UnAnswered extends Component {

  handleVote = (e, answer) => {
    e.preventDefault();
    this.props.handleVote(answer);
  };

  render() {
    const {question} = this.props;
    return (
      <Item.Group divided>
        <Item>
          <Item.Image src={question.avatar} alt={question.name}/>
          <Item.Content>
            <Item.Header>{question.name} on {question.date} asks:</Item.Header>
            <Item.Meta>
              <h3 className='cinema'>Would you rather</h3>
            </Item.Meta>
            <Item.Description>
              <Button.Group as='span'>
                <Button as='span' color='blue'
                        onClick={e => this.handleVote(e, 'optionOne')}>{question.optionOne.text}</Button>
                <Button.Or/>
                <Button as='span' color='teal'
                        onClick={e => this.handleVote(e, 'optionTwo')}>{question.optionTwo.text}</Button>
              </Button.Group>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}