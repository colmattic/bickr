ProfileController=RouteController.extend({
    template:"profile",
    waitOn:function(){
        return Meteor.subscribe("userProfile",this.params.id);
    },
    data:function(){
        var user = Meteor.user();
        if(user != undefined){
            var facebook = user.services.facebook
            if(facebook != undefined){
                var facebookid = facebook.id;
                FB.api(
                    facebookid + "/picture",
                    function (response) {
                      if (response && !response.error) {
                        picture = {picture: response.data.url};
                        Meteor.call('updateProfile', picture, user);
                      }
                    }
                );
            }  
        }
        
    }
});