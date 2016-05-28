MessageController=RouteController.extend({
    template:"message",
    waitOn:function(){
        return Meteor.subscribe("messages");
    },
    data:function(){
        var username=Router.current().params.username;
        return Meteor.users.findOne({
            username:username
        });
    }
});

Messages.allow({
  insert: function (userId, doc) {
    return (userId && doc.user === userId);
  }
});

Messages.before.insert(function (userId, doc) {
  doc.timestamp = Date.now();
});

