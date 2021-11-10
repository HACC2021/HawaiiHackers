import React from 'react';
import { Table, Label, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { _ } from 'lodash';
import { Meteor } from 'meteor/meteor';
import { withRouter, Link } from 'react-router-dom';
import { Rewards } from '../../api/reward/Reward';

/** Renders a single row in the List Reward table. See pages/ListReward.jsx. */
class RewardItem extends React.Component {

  handleClick(index) {
    Rewards.collection.update(this.props.reward._id,
      {
        $pull: {
          redeemedBy: this.props.reward.redeemedBy[index],
        },
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Removed', 'Reward item closed successfully', 'success');
        }
      });
    Meteor.call('deleteReward', this.props.reward.redeemedBy[index], this.props.reward.title, this.props.reward.owner, this.props.reward.description);
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.reward.title}</Table.Cell>
        <Table.Cell>{this.props.reward.description}</Table.Cell>
        <Table.Cell><Image size='small' src={this.props.reward.picture}/></Table.Cell>
        <Table.Cell>{this.props.reward.points}</Table.Cell>
        <Table.Cell>
          <Link to={`/rewards/edit/${this.props.reward._id}`}>Edit</Link>
        </Table.Cell>
        <Table.Cell>{this.props.reward.status}</Table.Cell>
        <Table.Cell>{_.map(this.props.reward.redeemedBy,
          (redeemedBy, index) => <Label key={index}>{redeemedBy}<Icon name='close' onClick={() => this.handleClick(index)}/></Label>)}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
RewardItem.propTypes = {
  reward: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    points: PropTypes.number,
    status: PropTypes.string,
    redeemedBy: PropTypes.array,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RewardItem);
