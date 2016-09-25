FeedController=RouteController.extend({
    template:"feed",
    waitOn:function(){
        return getFeed();
    },
    data: function(){
      return {
        feed: Feed.find()
      };
    },
    onBeforeAction: function () {
    // do some login checks or other custom logic
    //
    this.next();

  },action: function () {

    if (!Meteor.user() && this.ready()){ 
      this.render('loginPage');
    }else{
      this.render();
    } 
  }
});

