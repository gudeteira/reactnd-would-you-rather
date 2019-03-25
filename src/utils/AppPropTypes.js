import PropTypes from 'prop-types';

export default class AppPropTypes {

  static questionOption = PropTypes.shape({
    text: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(PropTypes.string)
  });

  static question = PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    optionOne: this.questionOption,
    optionTwo: this.questionOption,
    isAnswered: PropTypes.bool,
    timestamp: PropTypes.number.isRequired
  });

  static formattedQuestion = PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    optionOne: this.questionOption,
    optionTwo: this.questionOption,
    isAnswered: PropTypes.bool,
    timestamp: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  });

  static user = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
    answers: PropTypes.objectOf(PropTypes.string),
    questions: PropTypes.arrayOf(PropTypes.string)
  });

}