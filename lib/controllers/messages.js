MessagesController=RouteController.extend({
    template:"messages",
    data(){ 
      return{
        messages() {
          const messages = Messages.find({}, {sort: {timestamp: -1}});
          return messages;
        },
        channel() {
            const channelId = Session.get('channelId')
            const channel = Channels.findOne({ _id: channelId });
            if(channel){
              channel.obju1 = getUserObj(channel.u1);
              if(channel.obju1) {
                channel.obju1.score = getChannelScore(channelId, channel.u1) || 0;
              }
              channel.obju2 = getUserObj(channel.u2);
              if(channel.obju2) {
                channel.obju2.score = getChannelScore(channelId, channel.u2) || 0;
              }
              return channel;
            }
        }
      }
    },
    onBeforeAction () {
    Session.set('channel', this.params.channel);
    Session.set('channelId', this.params.channelId);
    this.next();

  },action () {
    
    this.subscribe('messages', Session.get('channelId'));
    this.render();
  }
});


