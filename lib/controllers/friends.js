FriendsController=RouteController.extend({
    template:"friends",
    waitOn(){
        return [Meteor.subscribe('follows', Meteor.userId()),getFacebookFriendsCollection()];
    },
    data(){
      return {
        friends: Friends.find()
      };
    },
    onBeforeAction () {
      
    Session.set('subject', this.params._subject);
    
    this.next();

  },action () {
    const facebookfriends = FacebookFriends.find().fetch();
    const follows = Follows.find().fetch();
    const merged = facebookfriends.concat(follows);
    
    _.sortBy(merged, (doc) => {return doc._id;});
    merged.forEach((doc) =>{
        Friends.insert(doc);
    });
    this.render();
  }
});

