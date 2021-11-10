import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The SubmissionsCollection. It encapsulates state and variable values for submission.
 */
class SubmissionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SubmissionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      date: {
        type: Date,
        defaultValue: new Date(),
      },
      description: String,
      picture: {
        type: String,
        optional: true,
      },
      publication: {
        type: Boolean,
        defaultValue: true,
      },
      status: {
        type: String,
        allowedValues: ['Pending', 'Approved'],
        defaultValue: 'Pending',
      },
      likes: {
        type: Number,
        defaultValue: 0,
      },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.feedPublicationName = `${this.name}.publication.feed`;
  }
}

/**
 * The singleton instance of the SubmissionsCollection.
 * @type {SubmissionsCollection}
 */
export const Submissions = new SubmissionsCollection();
