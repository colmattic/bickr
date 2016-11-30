import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
// ensure that channels documents have TTL index
Channels._ensureIndex( { "exp": 1 }, { expireAfterSeconds: 10 } );

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
    user: function() {
        if(Meteor.users){
            return Meteor.users.findOne()._id;
        }},
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

Factory.define('votes', Votes, {
});



});

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

getChannelExpiration = function(chanLength){
    var date = moment();
    var expDate;
    if(chanLength == -1) {
       expDate = date.add(100, 'years').toDate();       
        return expDate;
    } else {
        expDate = date.add(chanLength, 'd').toDate();
        return expDate;        
    }



}