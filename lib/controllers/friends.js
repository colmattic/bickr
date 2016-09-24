FriendsController=RouteController.extend({
    template:"friends",
    waitOn:function(){
        return getFacebookFriendsCollection();
    },
    data: function(){
      return {
        facbookusers: FacebookFriends.find()
      };
    },
    onBeforeAction: function () {
    // do some login checks or other custom logic
    Session.set('subject', this.params._subject);
    //
    this.next();

  },action: function () {

    this.render();
    
  
  }
});

