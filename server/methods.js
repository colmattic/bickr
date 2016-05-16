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
  }
})