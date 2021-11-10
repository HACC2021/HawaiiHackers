import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Container, Header, Loader, Card, Button, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { _ } from 'lodash';
import ChallengeCard from '../components/ChallengeCard';
import { Challenges } from '../../api/challenge/Challenge';
import { Profiles } from '../../api/profile/Profile';

/** Renders a table containing all of the Challenge documents. Use <ChallengeItem> to render each row. */
class ChallengesPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const buttonStyle = { marginBottom: '20px' };
    return (
      <Container>
        <Header as="h2" textAlign="center">Challenges</Header>
        {this.props.role === 'local business/organization' || Roles.userIsInRole(Meteor.userId(), 'admin') ?
          <Button as={NavLink} exact to="/challenges/add" style={buttonStyle} color='blue'><Icon name='plus'/>Add</Button>
          : ''}
        <Card.Group itemsPerRow={4}>
          {this.props.challenges.map((challenge, profile) => <ChallengeCard key={challenge._id} challenge={challenge} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Challenge documents in the props.
ChallengesPage.propTypes = {
  role: PropTypes.string,
  challenges: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Meteor.subscribe(Challenges.approvedPublicationName);
  const challenges = Challenges.collection.find({}).fetch();
  const subscription2 = Meteor.subscribe(Profiles.userPublicationName);
  const profiles = Profiles.collection.find({}).fetch();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const role = _.map(Profiles.collection.find({ owner: currentUser }).fetch(), 'role')[0];
  return {
    role,
    challenges,
    profiles,
    ready: subscription.ready() && subscription2.ready(),
  };
})(ChallengesPage);
