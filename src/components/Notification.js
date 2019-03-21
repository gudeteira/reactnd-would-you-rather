import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Message} from 'semantic-ui-react';
import {clearError} from '../actions/error';
import {ADD_QUESTION, ANSWER_QUESTION, removeAnswer, removeQuestion} from '../actions/questions';

class Notification extends Component {

  cancelAddQuestion = () => {
    this.closeNotification();
    this.props.dispatch(removeQuestion(this.props.error.question));
  };
  acceptAddQuestion = () => {
    this.closeNotification();
  };

  cancelAnswerQuestion = () => {
    this.closeNotification();
    this.props.dispatch(removeAnswer(this.props.error.data));
  };

  acceptAnswerQuestion = () => {
    this.closeNotification();
  };

  closeNotification = () => {
    this.props.dispatch(clearError());
  };

  render() {
    const {error} = this.props;
    let open = false;
    let onCancel;
    let onAccept;
    let notification = 'The nature of the backend does not allow the data to persist, but we can keep it during this session, do you accept?<br />\n' +
      '            if you don\'t accept, data will be removed.';
    if (error.message) {
      open = true;
      switch (error.action) {
        case ADD_QUESTION:
          onCancel = this.cancelAddQuestion;
          onAccept = this.acceptAddQuestion;
          break;
        case ANSWER_QUESTION:
          onCancel = this.cancelAnswerQuestion;
          onAccept = this.acceptAnswerQuestion;
          break;
        default:
          onCancel = this.closeNotification;
          onAccept = this.closeNotification;
          notification = 'Unexpected error occurred';
          break;
      }
    }
    return (<Modal size='mini' open={open} dimmer='blurring' closeOnEscape={false}
                   closeOnDimmerClick={false}>
      <Modal.Header>Oops!, an error occurred</Modal.Header>
      <Modal.Content>
        <Message color='yellow'>{error.message}</Message>
        <p>
          {notification}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={onCancel}>No</Button>
        <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={onAccept}/>
      </Modal.Actions>
    </Modal>);
  }
}

function mapStateToProps({error = null}) {
  return {error};
}

export default connect(mapStateToProps)(Notification);