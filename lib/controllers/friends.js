FriendsController=RouteController.extend({
    template:"friends",
    waitOn:function(){
        return getFacebookFriendsCollection();
    },
    data: function(){
      return {
        facbookusers: FacebookFriends.find()
      };
    }
});