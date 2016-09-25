import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.subscribe('messages');
Meteor.subscribe('votes');
Meteor.subscribe('channels', Meteor.userId());
Meteor.subscribe('posts', Meteor.userId());
Meteor.subscribe('follows', Meteor.userId());
Meteor.subscribe('allUsernames');
Meteor.subscribe('facebookusers');

Posts.allow({
    insert: function(userId, doc) {
        return (userId && doc.user === userId);
    }
});


Follows.allow({
    insert: function(userId, doc) {
        return (userId && doc.user === userId);
    }
});

Posts.before.insert(function (userId, doc) {
  doc.timestamp = Date.now();
});

Posts.after.insert(function(userId, doc) {
    //Router.go('/arenas/' + userId + '/' + channel);
});

Channels.after.insert(function(userId, doc) {
    var channel = doc.subject;
    var id = doc._id;
    Router.go('/arenas/' + id + '/' + channel);
});

