import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Feed } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Submissions } from '../../api/submission/Submission';
import FeedItem from '../components/FeedItem';

/** Renders a table containing all of the Submission documents. Use <SubmissionItem> to render each row. */
class Home extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">See what others are doing</Header>
        <Feed.Event>
          {this.props.submissions.map((submission) => <FeedItem key={submission._id} submission={submission} />)}
        </Feed.Event>
      </Container>
    );
  }
}

// Require an array of Submission documents in the props.
Home.propTypes = {
  submissions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Submission documents.
  const subscription = Meteor.subscribe(Submissions.feedPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Submission documents
  const submissions = Submissions.collection.find().fetch();
  return {
    submissions,
    ready,
  };
})(Home);
