Router.configure({
  layoutTemplate: 'app'
});

Router.route('/', function () {
  if (!Meteor.user() && this.ready()){ 
  	this.render('loginPage');
  }else{
    this.render('feed');
  }
});

Router.route('/arenas/:username/:channel/', function () {
    
  Session.set('channel', this.params.channel);
 
  this.render('messages');
  
  
});

Router.route("/arenas/",{
    name:"channels"
});

Router.route("/arena/create/:_subject?",function(){

    Session.set('subject', this.params._subject);
    this.render('createchannel');
});

Router.route("/search/",{
    name:"search"
});
Router.route("/feed/",{
    name:"feed"
});


Router.route("/privacy/",{
    name:"privacy"
});


// add the dataNotFound plugin, which is responsible for
// rendering the dataNotFound template if your RouteController
// data function returns a falsy value
Router.plugin("dataNotFound",{
    notFoundTemplate: "dataNotFound"
});

Router.route("/profile/:id",{
    name:"profile",
    controller:"ProfileController"
});

Router.route("/friends/",{
    name:"friends",
    controller:"FriendsController"
});




