import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ChallengesCollection. It encapsulates state and variable values for challenge.
 */
class ChallengesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ChallengesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      date: {
        type: Date,
        defaultValue: new Date(),
      },
      title: String,
      purpose: String,
      instructions: String,
      picture: {
        type: String,
        optional: true,
      },
      points: Number,
      owner: String,
      status: {
        type: String,
        allowedValues: ['Pending', 'Approved'],
        defaultValue: 'Pending',
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.approvedPublicationName = `${this.name}.publication.approved`;
  }
}

/**
 * The singleton instance of the ChallengesCollection.
 * @type {ChallengesCollection}
 */
export const Challenges = new ChallengesCollection();
