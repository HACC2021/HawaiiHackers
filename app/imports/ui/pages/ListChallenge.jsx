import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Challenges } from '../../api/challenge/Challenge';
import ChallengeItem from '../components/ChallengeItem';

/** Renders a table containing all of the Challenge documents. Use <ChallengeItem> to render each row. */
class ListChallenge extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Challenges</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Purpose</Table.HeaderCell>
              <Table.HeaderCell>Instructions</Table.HeaderCell>
              <Table.HeaderCell>Points</Table.HeaderCell>
              <Table.HeaderCell>Picture</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.challenges.map((challenge) => <ChallengeItem key={challenge._id} challenge={challenge} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Challenge documents in the props.
ListChallenge.propTypes = {
  challenges: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Challenge documents.
  const subscription = Meteor.subscribe(Challenges.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Challenge documents
  const challenges = Challenges.collection.find({}).fetch();
  return {
    challenges,
    ready,
  };
})(ListChallenge);
