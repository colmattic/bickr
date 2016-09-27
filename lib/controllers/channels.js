ChannelsController=RouteController.extend({
    template:"channels",
    waitOn:function(){
        return Meteor.subscribe('channels', Meteor.userId());
    },
    data: function(){
      return {
        channels() {
              return Channels.find({ $or: [{ 'u1': Meteor.userId() }, { 'u2': Meteor.userId() }] });
          },
          active() {
            var channelId = Session.get('channelId');
              if (channelId === this.id) {
                  return 'active';
              } else {
                  return '';
              }
          }
      };
    },
    onBeforeAction() {

      

      this.next();
  },action() {
    this.render();
  }
});

