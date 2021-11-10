import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { _ } from 'lodash';
import { Profiles } from '../../api/profile/Profile';
import { Rewards } from '../../api/reward/Reward';

/** Renders a single row in the List Reward table. See pages/ListReward.jsx. */
class RewardItemApproved extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const value = this.props.reward.points;
    const userPoints = _.map(Profiles.collection.find({ owner: Meteor.user().username }).fetch(), 'points')[0];
    if (userPoints >= value) {
      Meteor.call('updatePoints', Meteor.user().username, -value);
      const remainingPoints = userPoints - value;
      Rewards.collection.update(this.props.reward._id,
        {
          $push: {
            redeemedBy: Meteor.user().username,
          },
        });
      Meteor.call('addReward', Meteor.user().username, this.props.reward.title, this.props.reward.owner,
        this.props.reward.description, this.props.reward.picture);
      swal('Success', `You redeemed ${value} points. You have ${remainingPoints} points remaining`, 'success');
    } else {
      swal('Error', 'You do not have enough points', 'error');
    }
  }

  render() {
    const name = _.map(Profiles.collection.find({ owner: this.props.reward.owner }).fetch(), 'name')[0];
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.reward.title}</Card.Header>
          <Card.Meta>{name} | {this.props.reward.owner}</Card.Meta>
          <Card.Description>
            {this.props.reward.description}
            <Image src={this.props.reward.picture}/>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {this.props.reward.redeemedBy.includes(Meteor.user().username) ?
            <p>Redeemed. Claim your reward by providing the vendor with your username.</p> :
            <Button onClick={this.handleClick}><Icon name='leaf' color='green'/>{this.props.reward.points}</Button>}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
RewardItemApproved.propTypes = {
  reward: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    points: PropTypes.number,
    owner: PropTypes.string,
    redeemedBy: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
};

export default withTracker(() => {
  // Get access to Submission documents.
  const subscription = Meteor.subscribe(Profiles.feedPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Submission documents
  const profiles = Profiles.collection.find().fetch();
  return {
    profiles,
    ready,
  };
})(RewardItemApproved);
