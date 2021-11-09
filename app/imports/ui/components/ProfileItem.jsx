import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List User table. See pages/ListUser.jsx. */
class ProfileItem extends React.Component {

  render() {
    return (
      <Card>
        <Card.Content>
          <Image floated='left' size='mini' src={this.props.profile.picture} />
          <Card.Header>{this.props.profile.name}</Card.Header>
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
    name: PropTypes.string,
    picture: PropTypes.string,
    owner: PropTypes.string,
    role: PropTypes.string,
    _id: PropTypes.string,
    points: PropTypes.number,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileItem);
