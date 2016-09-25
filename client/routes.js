Router.configure({
  layoutTemplate: 'app'
});

Router.route('/', {
  name:"feed",
    controller:"FeedController"
  
});

Router.route('/arenas/:channelId/:channel/', function () {
    
  Session.set('channel', this.params.channel);
  Session.set('channelId', this.params.channelId);
  this.render('messages');
  
  
});

Router.route("/arenas/",{
    name:"channels"
});

Router.route("/arena/settings/:_subject?",function(){

    
    this.render('createchannel');
});

Router.route("/search/",{
    name:"search"
});

Router.route("/privacy/",{
    name:"privacy"
});


// add the dataNotFound plugin, which is responsible for
// rendering the dataNotFound template if your RouteController
// data function returns a falsy value
// Router.plugin("dataNotFound",{
//     notFoundTemplate: "dataNotFound"
// });

Router.route("/profile/:id",{
    name:"profile",
    controller:"ProfileController"
});

Router.route("/arena/friends/:_subject?",{
    name:"friends",
    controller:"FriendsController"
});




