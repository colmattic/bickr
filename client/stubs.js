Meteor.methods({
    newMessage: function(message) {
        message.timestamp = Date.now();
        message.user = Meteor.userId();
        var nextUserId = whosTurnNext(message.channelId, Meteor.userId());
        message.turn = nextUserId;
        Messages.insert(message);
        var p = isChannelPrivate(message.channelId);
        Channels.update(message.channelId, {
            $set: { turn: nextUserId },
        });
        if (!p) {
            var post = {
                'text': message.text,
                'name': message.text,
                'p': false,
                'type': 'm'
            };
            Meteor.call('newPost', post);
        }
  },
  newChannel: function (channel) {
    channel.timestamp = Date.now();
    channel.u1 = Meteor.userId();
    //var arrUsers =[];
    channel.u.map(function(id){
      //arrUsers.push({userid:userid, FbId: id});
    });
    channel.u2 = channel.u[0];
    channel.turn = Meteor.userId();
    channel.s = false;
    Channels.insert(channel);

        if (!channel.p) {
            var post = {
                'text': channel.subject,
                'name': channel.subject,
                'p': false,
                'type': 'c'
            };
            Meteor.call('newPost', post);
        }
    },
    newPost: function(post) {
        post.timestamp = Date.now();
        post.u = Meteor.userId();
        post.s = false;
        var userId = Meteor.userId();
        Posts.insert(post);
    },
    newFollow: function(follow) {
        follow.timestamp = Date.now();
        follow.u = Meteor.userId();
        follow.fid = idFollowFromName(follow);
        delete follow.name;
        Follows.insert(follow);
    },
    newVote: function(vote) {
        vote.timestamp = Date.now();
        vote.u = Meteor.userId();
        vote.uid = userFromMessage(vote.message);
        Votes.insert(vote);
        // Channels.update(vote.channel, {
        //   $set: { score: nextUserId },
        // });
    },
    updateProfile: function(picture) {
        Meteor.users.update({ _id: user._id }, { $set: { profile: picture } });
    }
});
