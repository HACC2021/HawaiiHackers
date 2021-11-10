import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Button, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Submissions } from '../../api/submission/Submission';

/** Renders a single row in the List Submission (Admin) table. See pages/ListSubmissionAdmin.jsx. */
class SubmissionItemAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const value = 30;
    Submissions.collection.update(this.props.submission._id,
      { $set: { status: 'Approved' } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          Meteor.call('updatePoints', this.props.submission.owner, value);
          swal('Success', 'Submission approved and points awarded', 'success');
        }
      });

  }

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
        <Table.Cell><Image src={this.props.submission.picture}/></Table.Cell>
        <Table.Cell>{publication}</Table.Cell>
        <Table.Cell>{this.props.submission.owner}</Table.Cell>
        {this.props.submission.status === 'Approved' ?
          <Table.Cell>{this.props.submission.status}</Table.Cell> :
          <Table.Cell><Button positive onClick={this.handleClick}><Icon name='check'/></Button></Table.Cell>
        }
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
SubmissionItemAdmin.propTypes = {
  submission: PropTypes.shape({
    date: PropTypes.date,
    description: PropTypes.string,
    picture: PropTypes.string,
    publication: PropTypes.boolean,
    status: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default SubmissionItemAdmin;
