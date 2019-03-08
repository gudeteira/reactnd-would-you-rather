import React, {Component} from 'react';
import '../App.css';
import {handleLoadData} from '../actions/shared';
import {connect} from 'react-redux';
import StickyLayout from './Layout';
import 'semantic-ui-css/semantic.min.css';
import QuestionList from './QuestionList';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleLoadData())
  }

  render() {
    return (
      <StickyLayout>
        {
         this.props.loading === true ? null : <QuestionList/>
        }
      </StickyLayout>
    );
  }
}

function mapStateToProps({login}) {
  return {
    loading: login === null
  }
}

export default connect(mapStateToProps)(App);
