import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { _ } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
function NavBar(props) {
  const menuStyle = { marginBottom: '10px' };
  return (
    (props.ready) ? (
      <Menu attached="top" style={menuStyle} borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h2'><Icon name='leaf'/>PonoPoints</Header>
        </Menu.Item>
        {props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/home" key='home'>Home</Menu.Item>,
            <Menu.Item key='submissions'>
              <Dropdown text="Submissions" pointing="top right">
                <Dropdown.Menu>
                  <Dropdown.Item icon="plus" text="Add New" as={NavLink} exact to="/add"/>
                  <Dropdown.Item icon="history" text="My Submissions" as={NavLink} exact to="/list"/>
                  {Roles.userIsInRole(Meteor.userId(), 'admin') ?
                    <Dropdown.Item icon="check" text="Review" as={NavLink} exact to="/review/submissions"/> :
                    ''}
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>,
            <Menu.Item key='challenges'>
              <Dropdown text="Challenges" pointing="top right">
                {props.role === 'local business/organization' || Roles.userIsInRole(Meteor.userId(), 'admin') ?
                  <Dropdown.Menu>
                    <Dropdown.Item text="View Challenges" as={NavLink} exact to="/"/>
                    <Dropdown.Item text="Completed Challenges" as={NavLink} exact to="/"/>
                    <Dropdown.Item icon="plus" text="Add New" as={NavLink} exact to="/addTask"/>
                    <Dropdown.Item icon="history" text="My Challenges" as={NavLink} exact to="/"/>
                    {Roles.userIsInRole(Meteor.userId(), 'admin') ?
                      <Dropdown.Item icon="check" text="Review" as={NavLink} exact to="/"/> :
                      ''}
                  </Dropdown.Menu> :
                  <Dropdown.Menu>
                    <Dropdown.Item text="View Challenges" as={NavLink} exact to="/"/>
                    <Dropdown.Item text="Completed Challenges" as={NavLink} exact to="/"/>
                  </Dropdown.Menu>}
              </Dropdown>
            </Menu.Item>,
            <Menu.Item key='rewards'>
              <Dropdown text="Rewards" pointing="top right">
                {props.role === 'local business/organization' || Roles.userIsInRole(Meteor.userId(), 'admin') ?
                  <Dropdown.Menu>
                    <Dropdown.Item text="View Rewards" as={NavLink} exact to="/rewards"/>
                    <Dropdown.Item text="Redeemed Rewards" as={NavLink} exact to="/rewards/redeemed"/>
                    <Dropdown.Item icon="plus" text="Add New" as={NavLink} exact to="/rewards/add"/>
                    <Dropdown.Item icon="history" text="My Rewards" as={NavLink} exact to="/rewards/list"/>
                    {Roles.userIsInRole(Meteor.userId(), 'admin') ?
                      <Dropdown.Item icon="check" text="Review" as={NavLink} exact to="/review/rewards"/> :
                      ''}
                  </Dropdown.Menu> :
                  <Dropdown.Menu>
                    <Dropdown.Item text="View Rewards" as={NavLink} exact to="/rewards"/>
                    <Dropdown.Item text="Redeemed Rewards" as={NavLink} exact to="/rewards/redeemed"/>
                  </Dropdown.Menu>}
              </Dropdown>
            </Menu.Item>,
          ]
        ) : ''}

        <Menu.Item position="right">
          {props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="address card" text="My Profile" as={NavLink} exact to="/profile"/>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>) : ''
  );
}

NavBar.propTypes = {
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  role: PropTypes.string,
};

export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const ready = Meteor.subscribe(Profiles.userPublicationName).ready();
  const role = _.map(Profiles.collection.find({ owner: currentUser }).fetch(), 'role')[0];
  return {
    ready,
    currentUser,
    role,
  };
})(NavBar);
