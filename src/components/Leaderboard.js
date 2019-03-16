import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserDetails from './UserDetails';


class Leaderboard extends Component {
  render() {
    const {users} = this.props;
    return (
      <div>
        Leaderboard

          {users.map(u => (
            <UserDetails key={u} user={u} />
          ))}


      </div>
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