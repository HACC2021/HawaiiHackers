import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Rewards } from '../../api/reward/Reward';
import RewardItem from '../components/RewardItem';

/** Renders a table containing all of the Reward documents. Use <RewardItem> to render each row. */
class ListReward extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">My Rewards</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Picture</Table.HeaderCell>
              <Table.HeaderCell>Points Required</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Redeemed By</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.rewards.map((reward) => <RewardItem key={reward._id} reward={reward} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Reward documents in the props.
ListReward.propTypes = {
  rewards: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Reward documents.
  const subscription = Meteor.subscribe(Rewards.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Reward documents
  const rewards = Rewards.collection.find({}).fetch();
  return {
    rewards,
    ready,
  };
})(ListReward);
