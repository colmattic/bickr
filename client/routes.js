Router.configure({
  layoutTemplate: 'app'
});

Router.route('/', function () {
  if (!Meteor.user() && this.ready()){ 
  	this.render('loginPage');
  }
});

Router.route('/channels/:channel', function () {
    Session.set('channel', this.params.channel);
   this.render('messages');
});

Router.route("/create/",{
    name:"createchannel"
});
Router.route("/search/",{
    name:"search"
});
Router.route("/feed/",{
    name:"feed"
});

// add the dataNotFound plugin, which is responsible for
// rendering the dataNotFound template if your RouteController
// data function returns a falsy value
Router.plugin("dataNotFound",{
    notFoundTemplate: "dataNotFound"
});

Router.route("/profile/:username",{
    name:"profile",
    controller:"ProfileController"
});




