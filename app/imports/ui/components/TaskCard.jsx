import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/task/Task';

/** Component for layout out a recipe Card. */
class TaskCard extends React.Component {

  render() {
    return (
      <Card centered>
        <Image rounded fluid src={this.props.task.image}/>
        <Card.Content>
          <Card.Header>{this.props.task.title}</Card.Header>
          <Card.Meta>
            {this.props.task.points} Pono Points
          </Card.Meta>
          <Card.Description>
            {this.props.task.purpose}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <span className='date'>Posted on {this.props.task.date.toLocaleDateString('en-US')}</span>
        </Card.Content>
      </Card>
    );
  }
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Tasks.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const tasks = Tasks.collection.find({}).fetch();
  return {
    tasks,
    ready,
  };
})(TaskCard);
