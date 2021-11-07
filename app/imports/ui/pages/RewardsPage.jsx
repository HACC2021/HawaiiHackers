import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { _ } from 'lodash';
import RewardItemApproved from '../components/RewardItemApproved';
import { Rewards } from '../../api/reward/Reward';
import { Profiles } from '../../api/profile/Profile';

/** Renders a table containing all of the Reward documents. Use <RewardItem> to render each row. */
class RewardsPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const buttonStyle = { marginBottom: '20px' };
    return (
      <Container>
        <Header as="h2" textAlign="center">Rewards</Header>
        <Button as={NavLink} exact to="/rewards/add" style={buttonStyle} color='blue'><Icon name='plus'/>Add</Button>
        <Card.Group itemsPerRow={4}>
          {this.props.rewards.map((reward, profile) => <RewardItemApproved key={reward._id} reward={reward} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Reward documents in the props.
RewardsPage.propTypes = {
  role: PropTypes.string,
  rewards: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Meteor.subscribe(Rewards.approvedPublicationName);
  const rewards = Rewards.collection.find({}).fetch();
  const subscription2 = Meteor.subscribe(Profiles.userPublicationName);
  const profiles = Profiles.collection.find({}).fetch();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const role = _.map(Profiles.collection.find({ owner: currentUser }).fetch(), 'role')[0];
  return {
    role,
    rewards,
    profiles,
    ready: subscription.ready() && subscription2.ready(),
  };
})(RewardsPage);
