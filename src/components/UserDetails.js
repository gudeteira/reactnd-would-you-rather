import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, Item, Statistic} from 'semantic-ui-react';


class UserDetails extends Component {

  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      answers: PropTypes.number.isRequired,
      questions: PropTypes.number.isRequired,
      ranking: PropTypes.number.isRequired
    }).isRequired
  };

  colors = {
    1: 'yellow',
    2: 'grey',
    3: 'brown',
  };

  render() {
    const {user} = this.props;
    const total = user.answers + user.questions;
    const stars = [];
    for (let i = 0; i < total; i++) {
      stars.push(<Icon key={i} color='yellow' name='star'/>);
    }
    const color = this.colors[user.ranking];
    return (
      <Item>
        <Item.Image size='small' src={user.avatar}/>
        <Item.Content>
          <Item.Header>{user.name}</Item.Header>
          <Item.Meta>
            {stars}
          </Item.Meta>
          <Item.Extra>
            <Statistic.Group widths='four' size='small'>
              <Statistic color='violet'>
                <Statistic.Value>{user.answers}</Statistic.Value>
                <Statistic.Label>Answers</Statistic.Label>
              </Statistic>
              <Statistic color='purple'>
                <Statistic.Value>{user.questions}</Statistic.Value>
                <Statistic.Label>Created</Statistic.Label>
              </Statistic>
              <Statistic color='pink'>
                <Statistic.Value>{user.answers + user.questions}</Statistic.Value>
                <Statistic.Label>Total</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  #{user.ranking}
                  {
                    color && <Icon name='trophy' color={color}/>
                  }
                </Statistic.Value>

              </Statistic>
            </Statistic.Group>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

function mapStateToProps({users}, {user, ranking}) {
  const theUser = users[user];
  return {
    user: {
      name: theUser.name,
      avatar: theUser.avatarURL,
      answers: Object.keys(theUser.answers).length,
      questions: theUser.questions.length,
      ranking
    }
  };
}

export default connect(mapStateToProps)(UserDetails);