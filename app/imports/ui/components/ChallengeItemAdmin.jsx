import React from 'react';
import { Button, Icon, Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Challenges } from '../../api/challenge/Challenge';

/** Renders a single row in the List Challenge table. See pages/ListChallenge.jsx. */
class ChallengeItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Challenges.collection.update(this.props.challenge._id,
      { $set: { status: 'Approved' } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Challenge approved', 'success');
        }
      });

  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.challenge.date.toLocaleDateString()}</Table.Cell>
        <Table.Cell>{this.props.challenge.title}</Table.Cell>
        <Table.Cell>{this.props.challenge.purpose}</Table.Cell>
        <Table.Cell>{this.props.challenge.instructions}</Table.Cell>
        <Table.Cell>{this.props.challenge.points}</Table.Cell>
        <Table.Cell><Image src={this.props.challenge.picture}/></Table.Cell>
        <Table.Cell>{this.props.challenge.owner}</Table.Cell>
        {this.props.challenge.status === 'Approved' ?
          <Table.Cell>{this.props.challenge.status}</Table.Cell> :
          <Table.Cell><Button positive onClick={this.handleClick}><Icon name='check'/></Button></Table.Cell>
        }
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ChallengeItem.propTypes = {
  challenge: PropTypes.shape({
    date: PropTypes.date,
    title: PropTypes.string,
    owner: PropTypes.string,
    purpose: PropTypes.string,
    instructions: PropTypes.string,
    points: PropTypes.number,
    picture: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ChallengeItem;
