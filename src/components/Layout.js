import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Container, Menu, Visibility,} from 'semantic-ui-react';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};


export default class StickyLayout extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
  };

  stickTopMenu = () => this.setState({menuFixed: true});

  unStickTopMenu = () => this.setState({menuFixed: false});

  render() {
    const {menuFixed} = this.state;

    return (

      <div>
        <style>{`html, body {
            background: #f7f7f7 !important;
          }`}</style>

        {/* Attaching the top menu is a simple operation, we only switch `fixed` prop and add another style if it has
            gone beyond the scope of visibility
          */}
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed ? 'top' : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container>
              <Menu.Item header>Would you rather</Menu.Item>
              <Menu.Item as={NavLink} to='/' exact activeClassName='active'>
                Home
              </Menu.Item>
              <Menu.Item as={NavLink} to='/add' activeClassName='active'>
                New Question
              </Menu.Item>
              <Menu.Item as={NavLink} to='/leaderboard' activeClassName='active'>
                LeaderBoard
              </Menu.Item>
            </Container>
          </Menu>

        </Visibility>
        <Container>
          {
            this.props.children
          }
        </Container>

      </div>
    );
  }
}