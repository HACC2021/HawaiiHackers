import React from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { _ } from 'lodash';
import swal from 'sweetalert';
import { Challenges } from '../../api/challenge/Challenge';
import { Profiles } from '../../api/profile/Profile';

class ChallengeCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  handleAccept() {
    Challenges.collection.update(this.props.challenge._id,
      { $set: { action: 'Accepted' } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Challenge accepted', 'success');
        }
      });
  }

  handleDecline() {
    Challenges.collection.update(this.props.challenge._id,
      { $set: { action: 'Declined' } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Challenge declined', 'success');
        }
      });
  }

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
            <b>When:</b> {this.props.challenge.date.toLocaleDateString()}
            <br/><b>Purpose:</b> {this.props.challenge.purpose}
            <br/><b>Instructions:</b> {this.props.challenge.instructions}
          </Card.Description>
        </Card.Content>
        {this.props.challenge.action === 'Accepted' ?
          '' :
          <Card.Content extra>
            <Button.Group>
              <Button positive onClick={this.handleAccept}>Accept</Button>
              <Button.Or/>
              <Button onClick={this.handleDecline}>Decline</Button>
            </Button.Group>
          </Card.Content>
        }
      </Card>
    );
  }
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired,
};

export default withTracker(() => {
  // Get access to Challenge documents.
  const subscription = Meteor.subscribe(Challenges.approvedPublicationName);
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
