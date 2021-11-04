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
});