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

// Template.messages.onCreated(function() {
//     this.autorun(() => {
//         this.subscribe('messages', Session.get('channelId'));
//     });
// });
Template.message.helpers({
    getvotes: function(message, type) {
        return getMessageScore(message, type);
    },
    hasvoted: function(message) {
        return hasVoted(message);
    },
    doEmojie: function(text) {
        if(text){
          return doEmojie(Template.message, text);  
        }
        
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