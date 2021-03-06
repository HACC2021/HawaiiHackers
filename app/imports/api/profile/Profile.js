import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfilesCollection. It encapsulates state and variable values for profile.
 */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      picture: {
        type: String,
        optional: true,
      },
      points: {
        type: Number,
        defaultValue: 0,
      },
      role: {
        type: String,
        allowedValues: ['resident', 'visitor', 'local business/organization'],
        defaultValue: 'resident',
      },
      rewards: {
        type: Array,
        defaultValue: [],
      },
      'rewards.$': Object,
      'rewards.$.title': String,
      'rewards.$.rewardOwner': String,
      'rewards.$.description': String,
      'rewards.$.picture': {
        type: String,
        optional: true,
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
 * The singleton instance of the ProfilesCollection.
 * @type {ProfilesCollection}
 */
export const Profiles = new ProfilesCollection();
