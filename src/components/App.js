import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import {handleLoadData} from '../actions/shared';
import StickyLayout from './Layout';
import Leaderboard from './Leaderboard';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import NewQuestion from './question/NewQuestion';
import QuestionDetails from './question/QuestionDetails';
import QuestionList from './QuestionList';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleLoadData());
  }

  render() {
    const {isAuthenticated, currentUser} = this.props;
    return (
      <Router>
        <StickyLayout>
          {
            this.props.loading === true
              ? null :
              <Fragment>
                <Link to='/logout'>Sign out</Link>
                {currentUser && <span>Hello {currentUser.name}</span>}
                <Switch>
                  <PrivateRoute path='/' exact component={QuestionList} isAuthenticated={isAuthenticated}/>
                  <Route path='/login' component={Login}/>
                  <Route path='/logout' component={Logout}/>
                  <PrivateRoute path='/question/:id' component={QuestionDetails} isAuthenticated={isAuthenticated}/>
                  <PrivateRoute path='/add' component={NewQuestion} isAuthenticated={isAuthenticated}/>
                  <PrivateRoute path='/leaderboard' component={Leaderboard} isAuthenticated={isAuthenticated}/>
                  <PrivateRoute path={'/404'} component={NotFound} isAuthenticated={isAuthenticated}/>
                  <Route component={NotFound}/>
                </Switch>
              </Fragment>
          }
        </StickyLayout>
      </Router>
    );
  }
}

function mapStateToProps({loaded, users, login}) {
  return {
    loading: !loaded,
    isAuthenticated: login !== null && login !== undefined && login !== '',
    currentUser: users[login]
  };
}

export default connect(mapStateToProps)(App);
