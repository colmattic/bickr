import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.subscribe('votes');

Meteor.subscribe('allUsernames');
Meteor.subscribe('friends');
Meteor.subscribe('channels', Meteor.userId());
Meteor.subscribe('posts', Meteor.userId());
Meteor.subscribe('follows', Meteor.userId());
Meteor.subscribe('messages');

Channels.after.insert((userId, doc) => {
          const channel = doc.subject;
          const id = doc._id;
          Router.go('/arenas/' + id + '/' + channel);
      });

Posts.before.insert((userId, doc) =>{
    doc.timestamp = Date.now();
  });

  Posts.after.insert((userId, doc) =>{
      //Router.go('/arenas/' + userId + '/' + channel);
  });

  Posts.allow({
  insert(userId, doc) {
      return (userId && doc.user === userId);
      }
  });
Follows.allow({
    insert(userId, doc) {
        return (userId && doc.user === userId);
        }
    });
Messages.allow({
      insert(userId, doc) {
        return (userId && doc.user === userId);
      }
    });
    Messages.before.insert((userId, doc) =>{
      doc.timestamp = Date.now();
    });