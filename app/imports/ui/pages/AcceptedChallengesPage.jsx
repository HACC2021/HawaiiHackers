import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ChallengeCard from '../components/ChallengeCard';
import { Challenges } from '../../api/challenge/Challenge';

/** Renders a table containing all of the Challenge documents. Use <ChallengeItem> to render each row. */
class AcceptedChallengesPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Accepted Challenges</Header>
        <Card.Group itemsPerRow={4}>
          {this.props.challenges.map((challenge) => <ChallengeCard key={challenge._id} challenge={challenge}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Challenge documents in the props.
AcceptedChallengesPage.propTypes = {
  challenges: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Meteor.subscribe(Challenges.approvedPublicationName);
  const challenges = Challenges.collection.find({ action: 'Accepted' }).fetch();
  return {
    challenges,
    ready: subscription.ready(),
  };
})(AcceptedChallengesPage);
