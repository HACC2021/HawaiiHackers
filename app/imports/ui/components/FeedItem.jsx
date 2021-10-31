import React from 'react';
import { Feed, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Submissions } from '../../api/submission/Submission';

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
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label><Image src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' /></Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{this.props.submission.owner}</Feed.User>
              <Feed.Date>{this.props.submission.date.toLocaleDateString()}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {this.props.submission.description}
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
    publication: PropTypes.boolean,
    likes: PropTypes.number,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default FeedItem;
