import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Item} from 'semantic-ui-react';
import UserDetails from './UserDetails';


class Leaderboard extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.string)
  };

  render() {
    const {users} = this.props;
    return (
      <Item.Group divided>
        {
          users.map((u, index) => <UserDetails key={u} user={u} ranking={index + 1}/>)
        }
      </Item.Group>
    );
  }
}

function mapStateToProps({users}) {
  return {
    users: sortUsers(users)
  };
}

function sortUsers(users) {
  return Object.keys(users).sort((a, b) => {
    const userA = users[a];
    const userB = users[b];
    return (Object.keys(userB.answers).length + userB.questions.length) - (Object.keys(userA.answers).length + userA.questions.length);
  });
}

export default connect(mapStateToProps)(Leaderboard);