import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Submissions } from '../../api/submission/Submission';
import SubmissionItemAdmin from '../components/SubmissionItemAdmin';

/** Renders a table containing all of the Submission documents. Use <SubmissionItem> to render each row. */
class ListSubmissionAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;

  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">All Submissions (Admin)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Picture</Table.HeaderCell>
              <Table.HeaderCell>Publication</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.submissions.map((submission) => <SubmissionItemAdmin key={submission._id} submission={submission} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Submission documents in the props.
ListSubmissionAdmin.propTypes = {
  submissions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Submission documents.
  const subscription = Meteor.subscribe(Submissions.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Submission documents
  const submissions = Submissions.collection.find({}).fetch();
  return {
    submissions,
    ready,
  };
})(ListSubmissionAdmin);
