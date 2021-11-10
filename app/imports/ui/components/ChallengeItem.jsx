import React from 'react';
import { Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Challenge table. See pages/ListChallenge.jsx. */
class ChallengeItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.challenge.date.toLocaleDateString()}</Table.Cell>
        <Table.Cell>{this.props.challenge.title}</Table.Cell>
        <Table.Cell>{this.props.challenge.purpose}</Table.Cell>
        <Table.Cell>{this.props.challenge.instructions}</Table.Cell>
        <Table.Cell>{this.props.challenge.points}</Table.Cell>
        <Table.Cell><Image src={this.props.challenge.picture}/></Table.Cell>
        <Table.Cell>
          <Link to={`/challenges/edit/${this.props.challenge._id}`}>Edit</Link>
        </Table.Cell>
        <Table.Cell>{this.props.challenge.status}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ChallengeItem.propTypes = {
  challenge: PropTypes.shape({
    date: PropTypes.date,
    title: PropTypes.string,
    purpose: PropTypes.string,
    instructions: PropTypes.string,
    points: PropTypes.number,
    picture: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ChallengeItem);
