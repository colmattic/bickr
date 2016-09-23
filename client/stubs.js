Meteor.methods({
  newMessage: function (message) {
    message.timestamp = Date.now();
    message.user = Meteor.userId();
    var channelId  = idFromSubject(message.channel);
    message.channelId = channelId;
    var nextUserId = whosTurnNext(message.channel, Meteor.userId());
    message.turn = nextUserId;
    Messages.insert(message);
    var p = isChannelPrivate(message.channel);

    Channels.update(channelId, {
      $set: { turn: nextUserId },
    });

  },
  newChannel: function (channel) {
    channel.timestamp = Date.now();
    channel.u1 = Meteor.userId();
    var arrUsers =[];
    
    channel.u.map(function(id){
      var userid = idFromFbId(id);
      arrUsers.push({userid:userid, FbId: id, main: true});
    });

    channel.u = arrUsers;
    channel.turn = Meteor.userId();
    channel.s = false;

    Channels.insert(channel);

    if(!channel.p){
      var post = {
      'text':channel.subject,
      'name':channel.subject,
      'p':false,
      'type':'c'
      };
      Meteor.call('newPost',post);
    }
  },
  newPost: function (post) {
    post.timestamp = Date.now();
    post.u = Meteor.userId();
    post.s = false;
    Posts.insert(post);
  },
  newFollow: function (follow) {
    follow.timestamp = Date.now();
    follow.u = Meteor.userId();
    follow.fid = idFollowFromName(follow);
    delete follow.name;
    Follows.insert(follow);
  },
  newVote: function (vote) {
    vote.timestamp = Date.now();
    vote.u = Meteor.userId();
    vote.uid = userFromMessage(vote.message);
    Votes.insert(vote);
    // Channels.update(vote.channel, {
    //   $set: { score: nextUserId },
    // });
  },
  updateProfile: function(picture){
    Meteor.users.update({_id: user._id}, {$set: {profile: picture}});
  }
});