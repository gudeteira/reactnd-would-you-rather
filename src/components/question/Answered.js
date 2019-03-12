import React from 'react';
import {Image, Item, Statistic} from 'semantic-ui-react';

const Answered = (props) => {
  const {question, currentUser} = props;
  return (
    <Item.Group>
      <Item>
        <Item.Image size='tiny' src={question.avatar}/>
        <Item.Content>
          <Item.Header>Asked by</Item.Header>
          <Item.Meta>{question.name}</Item.Meta>
          <Item.Description>
            <Statistic.Group size='large' widths='two'>
              <Statistic color='blue'>
                <Statistic.Value style={{textAlign: 'left'}}>
                  {question.optionOne.votes.includes(currentUser.id)
                  && <Image src={currentUser.avatarURL} inline circular style={{textAlign: 'left'}}/>}
                  {question.optionOne.votes.length}
                </Statistic.Value>
                <Statistic.Label style={{textAlign: 'left'}}>{question.optionOne.text}</Statistic.Label>
                <Statistic.Value style={{textAlign: 'left'}}>
                  {Math.round(question.optionOne.votes.length * 100 / (question.optionOne.votes.length + question.optionTwo.votes.length)*100)/100} %
                </Statistic.Value>
              </Statistic>
              <Statistic color='teal'>
                <Statistic.Value>
                  {question.optionTwo.votes.includes(currentUser.id)
                  && <Image src={currentUser.avatarURL} inline circular/>}
                  {question.optionTwo.votes.length}
                </Statistic.Value>
                <Statistic.Label>{question.optionTwo.text}</Statistic.Label>
                <Statistic.Value>
                  {Math.round(question.optionTwo.votes.length * 100 / (question.optionOne.votes.length + question.optionTwo.votes.length)*100)/100} %
                </Statistic.Value>
              </Statistic>
            </Statistic.Group>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default Answered;