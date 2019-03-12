import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {handleLoadData} from '../actions/shared';
// import '../App.css';
import StickyLayout from './Layout';
import NewQuestion from './NewQuestion';
import NotFound from './NotFound';
import QuestionDetails from './question/QuestionDetails';
import QuestionList from './QuestionList';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleLoadData());
  }

  render() {
    return (
      <Router>
        <StickyLayout>
          {
            this.props.loading === true
              ? null :
              <Fragment>
                <Switch>
                  <Route path='/' exact component={QuestionList}/>
                  <Route path='/question/:id' component={QuestionDetails}/>
                  <Route path='/add' component={NewQuestion}/>
                  <Route component={NotFound}/>
                </Switch>
              </Fragment>
          }
        </StickyLayout>
      </Router>
    );
  }
}

function mapStateToProps({loaded}) {
  return {
    loading: loaded !== true
  };
}

export default connect(mapStateToProps)(App);
