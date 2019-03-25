import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Container, Divider, Dropdown, Icon, Image, Menu, Segment, Visibility} from 'semantic-ui-react';
import AppPropTypes from '../utils/AppPropTypes';
import Notification from './Notification';

const menuStyle = {
  borderRadius: 0,
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};


class Layout extends Component {

  static propTypes = {
    user: AppPropTypes.user.isRequired,
  };

  state = {
    menuFixed: false,
    overlayFixed: false,
  };

  stickTopMenu = () => this.setState({menuFixed: true});

  unStickTopMenu = () => this.setState({menuFixed: false});

  render() {
    const {menuFixed} = this.state;
    const {name, avatarURL} = this.props.user;
    const trigger = (
      <span>
       {name} <Image avatar src={avatarURL}/>
      </span>
    );

    return (
      <div>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed ? 'top' : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}
            secondary
            pointing
          >
            <Container>
              <Menu.Item>
                <Image size='tiny' src='/images/logo.svg'/>
              </Menu.Item>
              <Menu.Item header><h3>Would you rather</h3></Menu.Item>

              <Menu.Menu position='right'>
                <Menu.Item as={NavLink} to='/' exact activeClassName='active' color='teal'>
                  Home
                </Menu.Item>
                <Menu.Item as={NavLink} to='/add' activeClassName='active' color='blue'>
                  New Question
                </Menu.Item>
                <Menu.Item as={NavLink} to='/leaderboard' activeClassName='active' color='violet'>
                  LeaderBoard
                </Menu.Item>
                <Dropdown trigger={trigger} icon={null} pointing className='link item profile-trigger'>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to='/logout'>
                      <Icon name='sign out'/>
                      Sign out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>
        <Divider hidden/>
        <Container className='no-border'>
          <Segment className='no-border'>
            {
              this.props.children
            }
          </Segment>
        </Container>

        <Notification/>
      </div>
    );
  }
}

function mapStateToProps({users, login}) {
  const user = users[login];
  return {
    user
  };
}

export default connect(mapStateToProps)(Layout);