FriendsController=RouteController.extend({
    template:"friends",
    waitOn:function(){
        return Meteor.subscribe("userProfile",Meteor.userId());
    },
    data:function(){
        var user = Meteor.user();
        if(user != undefined){
            var facebook = user.services.facebook
            if(facebook != undefined){
                var facebookid = facebook.id;
                var access_token = facebook.accessToken;
                return getFacebookFriendsCollection(facebookid,access_token);
            }
            
        }

        
    }
});