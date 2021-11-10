import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Submissions } from '../../api/submission/Submission';
import { Profiles } from '../../api/profile/Profile';
import { Challenges } from '../../api/challenge/Challenge';
import { Rewards } from '../../api/reward/Reward';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Challenges.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Challenges.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Rewards.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Rewards.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Challenges.adminPublicationName, function () {
  if (this.userId) {
    return Challenges.collection.find();
  }
  return this.ready();
});

Meteor.publish(Rewards.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Rewards.collection.find();
  }
  return this.ready();
});

Meteor.publish(Rewards.approvedPublicationName, function () {
  if (this.userId) {
    return Rewards.collection.find({ status: 'Approved' });
  }
  return this.ready();
});

Meteor.publish(Challenges.approvedPublicationName, function () {
  if (this.userId) {
    return Challenges.collection.find({ status: 'Approved' });
  }
  return this.ready();
});

Meteor.publish(Submissions.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Submissions.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Submissions.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Submissions.collection.find();
  }
  return this.ready();
});

Meteor.publish(Submissions.feedPublicationName, function () {
  if (this.userId) {
    return Submissions.collection.find({ status: 'Approved', publication: true });
  }
  return this.ready();
});

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Profiles.feedPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
