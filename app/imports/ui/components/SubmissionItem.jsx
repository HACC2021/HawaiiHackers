import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Submission table. See pages/ListSubmission.jsx. */
class SubmissionItem extends React.Component {
  render() {
    let publication;
    if (this.props.submission.publication) {
      publication = 'Allowed';
    } else {
      publication = 'Not allowed';
    }
    return (
      <Table.Row>
        <Table.Cell>{this.props.submission.date.toLocaleDateString()}</Table.Cell>
        <Table.Cell>{this.props.submission.description}</Table.Cell>
        <Table.Cell>{publication}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.submission._id}`}>Edit</Link>
        </Table.Cell>
        <Table.Cell>{this.props.submission.status}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
SubmissionItem.propTypes = {
  submission: PropTypes.shape({
    date: PropTypes.date,
    description: PropTypes.string,
    publication: PropTypes.boolean,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SubmissionItem);
