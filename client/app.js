import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


Meteor.subscribe('messages');
Meteor.subscribe('channels' , Meteor.userId());
Meteor.subscribe('posts' , Meteor.userId());
Messages.allow({
  insert: function (userId, doc) {
    return (userId && doc.user === userId);
  }
});

Posts.allow({
  insert: function (userId, doc) {
    return (userId && doc.user === userId);
  }
});

Posts.before.insert(function (userId, doc) {
  doc.timestamp = Date.now();
});


Messages.before.insert(function (userId, doc) {
  doc.timestamp = Date.now();
});
Template.messages.helpers({
  messages: Messages.find({})
});

Meteor.subscribe('allUsernames');

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper("usernameFromId", function (userId) {


    var user = Meteor.users.findOne({_id: userId});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    if (typeof user.services.github !== "undefined") {
        return user.services.github.username;
    }
    if (typeof user.services.twitter !== "undefined") {
        return user.services.twitter.screenName;
    }
    return user.username;
});



Template.registerHelper("timestampToTime", function (timestamp) {
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

Template.channels.helpers({
    channels: function () {
        
        return Channels.find({ u1: Meteor.userId() });
    }
});

Template.posts.helpers({
    posts: function () {
        
        return Posts.find({ u: Meteor.userId() });
    }
});


Template.channel.helpers({
    active: function () {
        if (Session.get('channel') === this.name) {
            return "active";
        } else {
            return "";
        }
    }
});

Template.messages.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('messages', Session.get('channel'));
  });
});


Template.users.helpers({
  results: function() { 
    var query = Session.get("user-search-query"),results;
      if(query) {
        query = new RegExp(query , 'i' );
        results = Meteor.users.find({$or: [{'username': query}]});
      }
    return results;
    }
});

Template.user2.helpers({
  results: function() { 
    var u2 = Session.get("u2"),results;
    var u3 = Session.get("u3"),results;
      if(u2) {
        u2 = new RegExp(u2 , 'i' );
        results = Meteor.users.find({$or: [{'username': u2}]});
      }
    return results;
    }
});

Template.user3.helpers({
  results: function() { 
    var u2 = Session.get("u2"),results;
    var u3 = Session.get("u3"),results;
      if(u3) {
        u3 = new RegExp(u3 , 'i' );
        results = Meteor.users.find({$or: [{'username': u3}]});
      }
    return results;
    }
});

idFromUsername = function(username){
    
    var user = Meteor.users.findOne({username: username});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    if (typeof user.services.github !== "undefined") {
        return user.services.github.username;
    }

    return user._id;
};




