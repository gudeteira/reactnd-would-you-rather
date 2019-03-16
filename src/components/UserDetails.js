import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserDetails extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <h2>{user.name}</h2>
        <img src={user.avatar} alt={`Avatar of ${user.name}`}/>
        <p>
          Questions answered: <b>{user.answers}</b>
        </p>
        <p>
          Questions created: <b>{user.questions}</b>
        </p>
      </div>
    );
  }
}

function mapStateToProps({users}, {user}) {
  const theUser = users[user];
  return {
    user: {
        name: theUser.name,
        avatar: theUser.avatarURL,
        answers: Object.keys(theUser.answers).length,
        questions: theUser.questions.length
      }
  };
}

export default connect(mapStateToProps)(UserDetails);