import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';

/** Renders a single row in the List User table. See pages/ListUser.jsx. */
class ProfileItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const value = 30;
    if (this.props.profile.points >= value) {
      Meteor.call('updatePoints', this.props.profile.owner, -value);
      swal('Success', `You redeemed ${value} points`, 'success');
    } else {
      swal('Error', 'You do not have enough points', 'error');
    }
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.profile.first} {this.props.profile.last}</Card.Header>
          <Card.Meta>{this.props.profile.owner} | {this.props.profile.role}</Card.Meta>
          <Card.Description>
            <Icon name='leaf' color='green'/>{this.props.profile.points} Pono Points
            <br/><Link to={'/rewards/redeemed/'}>Rewards</Link>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/edit-profile/${this.props.profile._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileItem.propTypes = {
  profile: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
    owner: PropTypes.string,
    role: PropTypes.string,
    _id: PropTypes.string,
    points: PropTypes.number,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileItem);
