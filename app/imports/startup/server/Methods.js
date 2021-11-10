import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
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
  'addReward'(owner, title, rewardOwner, description, picture) {
    check(owner, String);
    check(title, String);
    check(rewardOwner, String);
    check(description, String);
    check(picture, Match.OneOf(null, undefined, String));
    Profiles.collection.update(
      { owner: owner },
      { $push: { rewards: {
        title: title,
        rewardOwner: rewardOwner,
        description: description,
        picture: picture } } },
    );
  },

  'deleteReward'(owner, title, rewardOwner, description, picture) {
    check(owner, String);
    check(title, String);
    check(rewardOwner, String);
    check(description, String);
    check(picture, Match.OneOf(null, undefined, String));
    Profiles.collection.update(
      { owner: owner },
      { $pull: { rewards: {
        title: title,
        rewardOwner: rewardOwner,
        description: description,
        picture: picture } } },
    );
  },
});
