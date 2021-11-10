import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The RewardsCollection. It encapsulates state and variable values for reward.
 */
class RewardsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RewardsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: String,
      description: String,
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
      redeemedBy: {
        type: Array,
        defaultValue: [],
      },
      'redeemedBy.$': String,
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
 * The singleton instance of the RewardsCollection.
 * @type {RewardsCollection}
 */
export const Rewards = new RewardsCollection();
