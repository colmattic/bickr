Meteor.publish('messages', function(channel) {

    return Messages.find({ channel: channel });

});

Meteor.publish("allUsernames", function() {

    return Meteor.users.find({}, {
        fields: {
            "username": 1,
            "services.facebook": 1
        }
    });

});

Meteor.publish('channels', function(userId) {
    return Channels.find({$or: [{'u1': userId},{'u2': userId}]});
});


Meteor.publish('votes', function() {
    return Votes.find();
});

Meteor.publish('follow', function(userId) {
    return Follows.find({ u: userId });
});

Meteor.publish('posts', function(userId) {
    return Posts.find({ u1: userId });
});

Meteor.publish('singleUser', function(userId) {
    return Meteor.users.find(userId);
});

Meteor.publish("userProfile", function(userId) {
    // simulate network latency by sleeping 2s
    Meteor._sleepForMs(2000);
    // try to find the user by username
    var user = Meteor.users.findOne({
        _id: userId
    });
    // if we can't find it, mark the subscription as ready and quit
    if (!user) {
        this.ready();
        return;
    }
    // if the user we want to display the profile is the currently logged in user...
    if (this.userId == user._id) {
        // then we return the corresponding full document via a cursor
        return Meteor.users.find(this.userId);
    } else {
        // if we are viewing only the public part, strip the "profile"
        // property from the fetched document, you might want to
        // set only a nested property of the profile as private
        // instead of the whole property
        return Meteor.users.find(user._id, {
            fields: {
                "profile": 1,
                "services": 1
            }
        });
    }
});




