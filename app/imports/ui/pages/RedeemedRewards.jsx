import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profile';
import RewardItemRedeemed from '../components/RewardItemRedeemed';

/** Renders a table containing all of the Profile documents. Use <ProfileItem> to render each row. */
class RedeemedRewards extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Redeemed Rewards</Header>
        <Card.Group itemsPerRow={4}>
          {this.props.profile.rewards.map((rewards, index) => <RewardItemRedeemed key={index} rewards={rewards} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Profile documents in the props.
RedeemedRewards.propTypes = {
  profile: PropTypes.shape({
    rewards: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      rewardOwner: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })),
  }),
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Profile documents
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const profile = Profiles.collection.findOne({ owner: currentUser });
  return {
    profile,
    ready,
  };
})(RedeemedRewards);
