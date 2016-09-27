CreateChannelController=RouteController.extend({
    template:"createchannel",
    data: function(){
      return {
        subject(message, type) {
            return Session.get('subject');
        }
      };
    },
    onBeforeAction: function () {
    this.next();

  },action: function () {
    this.render();
  }
});

