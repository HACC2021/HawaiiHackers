import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The TasksCollection. It encapsulates state and variable values for task.
 */
class TasksCollection {
  constructor() {
    // The name of this collection.
    this.name = 'TasksCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: String,
      image: String,
      date: Date,
      points: Number,
      owner: String,
      purpose: String,
      instructions: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the TasksCollection.
 * @type {TasksCollection}
 */
export const Tasks = new TasksCollection();
