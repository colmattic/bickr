Meteor.startup(function() {
window.fbAsyncInit = function() {
      FB.init({
        appId      : '159404281130677',
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.7' // use graph api version 2.5
      });
      $(document).trigger('fbload');
}


});