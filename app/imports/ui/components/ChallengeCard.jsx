import React from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'lodash';
import { Challenges } from '../../api/challenge/Challenge';
import { Profiles } from '../../api/profile/Profile';

class ChallengeCard extends React.Component {

  render() {
    const name = _.map(Profiles.collection.find({ owner: this.props.challenge.owner }).fetch(), 'name')[0];
    return (
      <Card centered>
        <Image rounded fluid src={this.props.challenge.picture}/>
        <Card.Content>
          <Card.Header>{this.props.challenge.title}
            <br/><Icon name='leaf' color='green'/>{this.props.challenge.points}</Card.Header>
          <Card.Meta>{name} | {this.props.challenge.owner}</Card.Meta>
          <Card.Description>
            <b>Purpose:</b> {this.props.challenge.purpose}
            <br/><b>Instructions:</b> {this.props.challenge.instructions}
          </Card.Description>
        </Card.Content>
        <Card.Content extra floated='right'>
          Posted on {this.props.challenge.date.toLocaleDateString()}
          <Button.Group>
            <Button positive>Accept</Button>
            <Button.Or />
            <Button>Decline</Button>
          </Button.Group>
        </Card.Content>
      </Card>
    );
  }
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired,
};

export default withTracker(() => {
  // Get access to Challenge documents.
  const subscription = Meteor.subscribe(Challenges.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Challenge documents
  const challenges = Challenges.collection.find({}).fetch();
  const subscription2 = Meteor.subscribe(Profiles.feedPublicationName);
  const ready2 = subscription2.ready();
  const profiles = Profiles.collection.find().fetch();
  return {
    challenges,
    profiles,
    ready,
    ready2,
  };
})(ChallengeCard);
