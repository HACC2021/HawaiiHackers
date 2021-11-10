import React from 'react';
import { Table, Button, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Rewards } from '../../api/reward/Reward';

/** Renders a single row in the List Reward (Admin) table. See pages/ListRewardAdmin.jsx. */
class RewardItemAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Rewards.collection.update(this.props.reward._id,
      { $set: { status: 'approved' } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Reward approved', 'success');
        }
      });

  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.reward.title}</Table.Cell>
        <Table.Cell>{this.props.reward.description}</Table.Cell>
        <Table.Cell><Image size='small' src={this.props.reward.picture}/></Table.Cell>
        <Table.Cell>{this.props.reward.points}</Table.Cell>
        <Table.Cell>{this.props.reward.owner}</Table.Cell>
        {this.props.reward.status === 'approved' ?
          <Table.Cell>{this.props.reward.status}</Table.Cell> :
          <Table.Cell><Button positive onClick={this.handleClick}><Icon name='check'/></Button></Table.Cell>
        }
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
RewardItemAdmin.propTypes = {
  reward: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    points: PropTypes.number,
    status: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default RewardItemAdmin;
