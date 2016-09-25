Template.registerHelper("usernameFromId", function(userId) {
	var name = usernameFromId(userId);
	return name;
});

Template.registerHelper('equals', function(a, b) {
    return a === b;
});

Template.registerHelper("timestampToTime", function(timestamp) {
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(minutes.length - 2) + ':' + seconds.substr(seconds.length - 2);
});


Template.channels.helpers({
    channels: function() {

        return Channels.find({ $or: [{ 'u1': Meteor.userId() }, { 'u2': Meteor.userId() }] });
    }
});
Template.channel.helpers({
    active: function() {
    	var channelId = Session.get('channelId');
        if (channelId === this.id) {
            return "active";
        } else {
            return "";
        }
    }
});

Template.messages.helpers({
    messages: function() {
    	var	messages = Messages.find({}, {sort: {timestamp: -1}});
    	return messages;
    },
    channel: function() {
        var channel = Channels.findOne({ _id: Session.get('channelId') });
        if(channel){
        	channel.obju1 = getUserObj(channel.u1);
	        channel.obju1.score = getChannelScore(channel._id, channel.u1);
	        channel.obju2 = getUserObj(channel.u2);
	        channel.obju2.score = getChannelScore(channel._id, channel.u2);
	        return channel;
        }
        
    }
});
Template.messages.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('messages', Session.get('channelId'));
    });
});


Template.message.helpers({
    getvotes: function(message, type) {
        return getMessageScore(message, type);
    },
    hasvoted: function(message) {
        return hasVoted(message);
    },
    doEmojie: function(text) {
        return doEmojie(Template.message, text);
    }
});

Template.createchannel.helpers({
    subject: function(message, type) {
        return Session.get('subject');
    }
});


Template.users.helpers({
    results: function() {
        var query = Session.get("user-search-query"),
            results;
        if (query) {
            query = new RegExp(query, 'i');
            results = Meteor.users.find({ $or: [{ 'services.facebook.name': query }] });
        }
        return results;
    }
});