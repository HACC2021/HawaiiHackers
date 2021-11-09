import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'lodash';
import { Profiles } from '../../api/profile/Profile';

/** Renders a single row in the List Reward table. See pages/ListReward.jsx. */
class RewardCard extends React.Component {

  render() {
    const name = _.map(Profiles.collection.find({ owner: this.props.rewards.rewardOwner }).fetch(), 'name')[0];
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.rewards.title}</Card.Header>
          <Card.Meta>{name} | {this.props.rewards.rewardOwner}</Card.Meta>
          <Card.Description>
            {this.props.rewards.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          Redeemed. Claim your reward by providing the vendor with your username.
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
RewardCard.propTypes = {
  rewards: PropTypes.object,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default RewardCard;
