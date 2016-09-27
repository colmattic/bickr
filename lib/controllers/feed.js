FeedController=RouteController.extend({
  template:"feed",
  waitOn(){
      return [Meteor.subscribe('posts', Meteor.userId()),getFeed()];
  },
  data(){
    return {
      feed: Feed.find()
    };
  },
  onBeforeAction() {
  this.next();
  },
  action() {
    const facebookfeed = FacebookFeed.find().fetch();
    const posts = Posts.find().fetch();
    const merged = facebookfeed.concat(posts);
    _.sortBy(merged, (doc) => {return doc.created_time;});
    Feed.remove({});
    merged.forEach((doc) =>{
        Feed.insert(doc);
    });
    this.render();
  }
});



