import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Profiles } from '../../api/profile/Profile';

Meteor.methods({
  'updatePoints'(owner, updateValue) {
    check(owner, String);
    check(updateValue, Number);
    Profiles.collection.update(
      { owner: owner },
      { $inc: { points: updateValue } },
    );
  },
  'addReward'(owner, title, rewardOwner, description) {
    check(owner, String);
    check(title, String);
    check(rewardOwner, String);
    check(description, String);
    Profiles.collection.update(
      { owner: owner },
      { $push: { rewards: {
        title: title,
        rewardOwner: rewardOwner,
        description: description } } },
    );
  },

  'deleteReward'(owner, title, rewardOwner, description) {
    check(owner, String);
    check(title, String);
    check(rewardOwner, String);
    check(description, String);
    Profiles.collection.update(
      { owner: owner },
      { $pull: { rewards: {
        title: title,
        rewardOwner: rewardOwner,
        description: description } } },
    );
  },
});
