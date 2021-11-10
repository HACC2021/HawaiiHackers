import { Meteor } from 'meteor/meteor';
import { Submissions } from '../../api/submission/Submission.js';
import { Profiles } from '../../api/profile/Profile.js';
import { Rewards } from '../../api/reward/Reward.js';
import { Challenges } from '../../api/challenge/Challenge.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: submission from (${data.owner})`);
  Submissions.collection.insert(data);
}

// Initialize the SubmissionsCollection if empty.
if (Submissions.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addProfile(profile) {
  console.log(`  Adding: (${profile.owner})`);
  Profiles.collection.insert(profile);
}

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
  }
}

function addReward(reward) {
  console.log(`  Adding: (${reward.title})`);
  Rewards.collection.insert(reward);
}

if (Rewards.collection.find().count() === 0) {
  if (Meteor.settings.defaultRewards) {
    console.log('Creating default rewards.');
    Meteor.settings.defaultRewards.map(reward => addReward(reward));
  }
}

function addChallenge(challenge) {
  console.log(`  Adding: (${challenge.title})`);
  Challenges.collection.insert(challenge);
}

if (Challenges.collection.find().count() === 0) {
  if (Meteor.settings.defaultChallenges) {
    console.log('Creating default challenges.');
    Meteor.settings.defaultChallenges.map(challenge => addChallenge(challenge));
  }
}
