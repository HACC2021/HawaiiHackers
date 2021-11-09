import React from 'react';
import { _ } from 'lodash';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Feed, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Submissions } from '../../api/submission/Submission';
import { Profiles } from '../../api/profile/Profile';

/** Renders a single row in the List Submission (Admin) table. See pages/ListSubmissionAdmin.jsx. */
class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Submissions.collection.update(this.props.submission._id,
      { $inc: { likes: 1 } });
  }

  render() {
    const picture = _.map(Profiles.collection.find({ owner: this.props.submission.owner }).fetch(), 'picture')[0];
    const name = _.map(Profiles.collection.find({ owner: this.props.submission.owner }).fetch(), 'name')[0];
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label><Image src={picture}/></Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{name}</Feed.User>
              <Feed.Date>{this.props.submission.date.toLocaleDateString()}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {this.props.submission.description}
            </Feed.Extra>
            <Feed.Extra>
              <Image src={this.props.submission.picture}/>
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like>
                <Icon name='like' onClick={this.handleClick}/>{this.props.submission.likes} Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    );
  }
}

// Require a document to be passed to this component.
FeedItem.propTypes = {
  submission: PropTypes.shape({
    date: PropTypes.date,
    description: PropTypes.string,
    picture: PropTypes.string,
    publication: PropTypes.boolean,
    likes: PropTypes.number,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
  profiles: PropTypes.array,
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
})(FeedItem);
