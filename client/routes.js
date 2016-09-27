Router.configure({
  layoutTemplate: 'app',
  onBeforeAction(pause) {
    var routeName = this.route.name;
    if (! Meteor.userId()) {
        //if you have named yields it the login form
        this.render('loginPage');
        pause();
    }else{
      this.next();
    }
}
});

Router.route('/', {
    name:'feed',
    controller:'FeedController'
});
// Router.route('/arenas/:channelId/:channel/',  function (){  
//     Session.set('channel', this.params.channel);
//     Session.set('channelId', this.params.channelId);
//     this.render('messages');
// });

Router.route('/arenas/:channelId/:channel/',{
    name:'messages',
    controller:'MessagesController'
});

Router.route('/arenas/',{
    name:'channels',
    controller:'ChannelsController'
});
Router.route('/arena/settings/:_subject?',{
    name:'createchannel',
    controller:'CreateChannelController'
});
Router.route('/profile/:id',{
    name:'profile',
    controller:'ProfileController'
});

Router.route('/arena/friends/:_subject?',{
    name:'friends',
    controller:'FriendsController'
});
Router.route('/search/',{
    name:'search'
});

Router.route('/privacy/',{
    name:'privacy'
});

// Router.plugin('dataNotFound',{
//     notFoundTemplate: 'dataNotFound'
// });




