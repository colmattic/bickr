Meteor.methods({
  newMessage: function (message) {
    message.timestamp = Date.now();
    message.user = Meteor.userId();
    Messages.insert(message);
  },
  newChannel: function (channel) {
    channel.timestamp = Date.now();
    channel.u1 = Meteor.userId();
    channel.u2 = idFromUsername(channel.u2);
    channel.u3 = idFromUsername(channel.u3);
    channel.s = false;
    channel.u = 1
    Channels.insert(channel);
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
    //vote.fid = idMessageFromName(vote);
    //delete vote.name;
    
    Votes.insert(follow);
    Messages.update();
    Channels.update();
  }
})