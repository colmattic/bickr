import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
 //  smtp = {
 //    username: '',
 //    password: '',
 //    server:   'smtp.mandrillapp.com',
 //    port: 587
 // };
    
  //process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

Factory.define('message', Messages, {
    text: function() {
        return Fake.sentence();
    },
    user: Meteor.users.findOne()._id,
    timestamp: Date.now(),
    channel: 'general'
});

Factory.define('post', Posts, {
    text: function() {
        return Fake.sentence();
    },
    timestamp: Date.now()
});

Factory.define('follow', Follows, {
    timestamp: Date.now()
});



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

idFollowFromName = function(follow){
    
    var result
    
    switch(follow.type) {
    case 'u':
        result = Meteor.users.findOne({username: follow.name});
        break;
    case 'c':
        result = Channels.findOne({subject: follow.name});
        break;
    case 'p':
        result = Posts.findOne({name: follow.name});
        break;
    }
    return result._id;
};