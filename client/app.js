import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});



Meteor.subscribe('messages');
Meteor.subscribe('votes');
Meteor.subscribe('channels', Meteor.userId());
Meteor.subscribe('posts' , Meteor.userId());
Meteor.subscribe('follows' , Meteor.userId());
Meteor.subscribe('allUsernames');

Posts.allow({
  insert: function (userId, doc) {
    return (userId && doc.user === userId);
  }
});

Follows.allow({
  insert: function (userId, doc) {
    return (userId && doc.user === userId);
  }
});

Posts.before.insert(function (userId, doc) {
  doc.timestamp = Date.now();
});

Posts.after.insert(function (userId, doc) {
  Router.go('/arenas/'+username+'/'+channel);
});

Channels.after.insert(function (userId, doc) {
  var channel= doc.subject;
  var username = usernameFromId(doc.u1);
  Router.go('/arenas/'+username+'/'+channel);
});

// Votes.after.insert(function (obj,lastinsert) {
//   var result = Template.message.__helpers.get('getvotes').call(this,lastinsert.message, lastinsert.type)
// });


//helpers

Template.registerHelper("usernameFromId", function (userId) {


    var user = Meteor.users.findOne({_id: userId});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    
    return user.username;
});

 Template.registerHelper('equals', function (a, b) {
      return a === b;
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
        
        return Channels.find({$or: [{'u1': Meteor.userId()},{'u2': Meteor.userId()}]});
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

Template.posts.helpers({
    posts: function () {
        
        return Posts.find({ u: Meteor.userId() });
    }
});

Template.messages.helpers({
  messages: Messages.find({}),
  channel: function(){
    var channel = Channels.findOne({subject: Session.get('channel')});
    channel.obju1 = getUserObj(channel.u1);
    channel.obju1.score = getChannelScore(channel._id, channel.u1);
    channel.obju2 = getUserObj(channel.u2);
    channel.obju2.score = getChannelScore(channel._id, channel.u2);
    return channel;
  }
});
Template.messages.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('messages', Session.get('channel'));
  });
});

Template.message.helpers({
  getvotes: function(message,type){
    return getMessageScore(message,type);
  },
  hasvoted: function(message){
    return hasVoted(message);
  },
  doEmojie:function(text){
    return doEmojie(Template.message,text);
  }
});

Template.createchannel.helpers({
  subject: function(message,type){
    return Session.get('subject');
  }
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



Template.friends.helpers ({
getFriends: function(){
   
    return '';
    
}
});

//functions
isChannelPrivate = function(subject){
    
    var channel = Channels.find({subject: subject});
    return channel.p;
    
};

whosTurnNext = function(subject, userId){
    
    var channel = Channels.find({subject: subject});
    if(channel.u1 == userId){
      return channel.u2;
    }
    else if(channel.u2 == userId){
      return channel.u1;
    }   
};

whosTurnNow = function(subject){
    
    var channel = Channels.findOne({subject: subject});
    return channel.turn;
     
};

idFromSubject= function(subject){   
    var channel = Channels.findOne({subject: subject});
    return channel._id;
};

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

usernameFromId = function(userid){
    
    var user = Meteor.users.findOne({_id: userid});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    if (typeof user.services.github !== "undefined") {
        return user.services.github.username;
    }

    return user.username;
};

getUserObj = function(userid){
    var user = Meteor.users.findOne({_id: userid });
    return user;
};

idFollowFromName = function(follow){
    
    var result
    
    switch(follow.type) {
    case 'u':
        result = Meteor.users.findOne({username: follow.name });
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
hasVoted = function(message){
var result = Votes.find({'message':message,'u':Meteor.userId()});
    if (result.count()) {
      return true;
    }
    else{
      return false;  
    } 

}

getChannelScore = function(channel, userid){
    
    processed_data = []; 
    var result =0;
    Deps.autorun(function (c) {
        
        var cursor = Votes.find({'channel':channel});
        if (!cursor.count()) return;

        cursor.forEach(function (row) {
            result+= parseInt(row.value);
            processed_data.push(row.value);
        }); 

        c.stop();
    }); 
    return result;

}
getMessageScore = function(message,type){
    
    processed_data = []; 
    var result =0;
    Deps.autorun(function (c) {
        console.log(message);
        console.log(type)
        var cursor = Votes.find({'message':message,'type':type});
        if (!cursor.count()) return;

        cursor.forEach(function (row) {
            console.log(row.value);
            result+= parseInt(row.value);
            processed_data.push(row.value);
        }); 

        c.stop();
    }); 


    return result;

}

userFromMessage= function(message){
  var result = Messages.find({'_id': message});
  return result.user;
}

doEmojie = function (tmpl, data) {
  data = data.replace(/(^|\W)(#[a-z\d][\w-]*)/ig, '<img class="emojie" src="/images/$2.jpg"/>');
  data = replaceAll(data, '#','');
  return data;
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

getFacebookFriendsCollection = function(facebookid,access_token){
      var collection = new Meteor.Collection(null);
      var retries = 0;
      var count = 0;
      var self = this;
      FB.api('me/friends?access_token='+ access_token, function(response) {
              if (response && !response.error){
                  var items = response.data;
                  var paging = response.paging;
                  if(items.length > 0) {
                    $.each(items, function(doc){
                     collection.insert(doc); 
                  });
                  }
                  
                  // count += items.length;
                  // if (count<maxItems && paging && paging.next){
                  //     retries = 0;
                  //     self._get(paging.next,handleResponse);
                  // }
              } else if (retries<3) {
                  retries+=1;
                  console.log("FB: ",response.error);
              } else {
                  console.log("Exceeded");
              }
              return collection;
      });
}
