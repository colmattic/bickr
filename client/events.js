Template.messages.events({'keypress input': function(e) {
    var inputVal = $('.input-box_text').val();
    if(!!inputVal) {
      var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
      if (charCode == 13) {
        e.stopPropagation();
        Meteor.call('newMessage', {
    text: $('.input-box_text').val(),
    channel: Session.get('channel')
});
        $('.input-box_text').val("");
        return false;
      }    
    }
  }
});

Template.search.events({'keyup input.search-query': function (e) {
      Session.set("user-search-query", e.currentTarget.value);
    }
  });
Template.createchannel.events({'keyup input.search-query': function (e) {
      Session.set("user-search-query", e.currentTarget.value);
    }
  });
Template.createchannel.events({'keyup input.u2': function (e) {
      Session.set("u2", e.currentTarget.value);
    }
  });
Template.createchannel.events({'keyup input.u3': function (e) {
      Session.set("u3", e.currentTarget.value);
    }
  });


Template.createchannel.events({'submit .new-channel': function (e) {
    // Prevent default browser form submit
    e.preventDefault();
 
    // Get value from form element
    const target = e.target;
    
    
    // Insert a channel into the collection
    
    //make string lower
    var subject = target.subject.value;
    subject = subject.toLowerCase();
    subject = subject.replace(/\s/g, '');
    subject = subject.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
    var p = parseInt($("#p").val());
    p =  (p==1) ? true : false;
    var channel = {
      'subject':subject,
      'l':target.l.value,
      'u': Session.get("channelfriends"),
      'p':p
    };

    Meteor.call('newChannel',channel);
 
    // Clear form
    target.subject.value = '';
    Session.set("channelfriends" ,'');
  },
});

Template.user2.events({
    'click a.add-u2': function (e) {
      // Prevent default browser form submit
      e.preventDefault();
      var username =  e.target.attributes[1].nodeValue;
      $('#u2').val(username);
    }
  });

Template.user3.events({
    'click a.add-u3': function (e) {
      // Prevent default browser form submit
      e.preventDefault();
      var username =  e.target.attributes[1].nodeValue;
      $('#u3').val(username);
    }
  });

Template.createpost.events({'click a.new_post': function (e) {
    // Prevent default browser form submit
    e.preventDefault();
 
    // Get value from form element
    const target = e.target;
    
    
    // Insert a channel into the collection
    
    //make string lower
    var text = $("#text").val();
    var p = $("#p").val();
    var name = text.toLowerCase();
    name = name.replace(/\s/g, '');
    
    var post = {
      'text':text,
      'name':name,
      'p':p,
      'type':'p'
    };

    Meteor.call('newPost',post);
    // Clear form
    target.text.value = '';
  },
});


Template.post.events({'click a.follow_post': function (e) {
    // Prevent default browser form submit
    e.preventDefault();
   
    // Get value from form element
    const target = e.target;
    
    var name = target.attributes[3].nodeValue;

    var follow = {
      'name':name,
      'type':'p'
    };

    Meteor.call('newFollow',follow);
  
  }
});

Template.users.events({'click a.follow_user': function (e) {
    // Prevent default browser form submit
    e.preventDefault();
   
    // Get value from form element
    const target = e.target;
    
    var name = target.attributes[3].nodeValue;

    var follow = {
      'name':name,
      'type':'u'
    };

    Meteor.call('newFollow',follow);
  
  }
});

Template.messages.events({'click a.follow_channel': function (e) {
    // Prevent default browser form submit
    e.preventDefault();
   
    // Get value from form element
    const target = e.target;
    
    var name = target.attributes[3].nodeValue;

    var follow = {
      'name':name,
      'type':'c'
    };

    Meteor.call('newFollow',follow);
  
  }
});

Template.messages.events({'click a.vote_up': function (e) {
    // Prevent default browser form submit
    e.preventDefault();
   
    // Get value from form element
    const target = e.currentTarget;
    var message = target.attributes[2].nodeValue;
    var channel = target.attributes[3].nodeValue;
    var vote = {
      'value':1,
      'type':'up',
      'message': message,
      'channel': channel
    };

    if(!hasVoted(message)){
      Meteor.call('newVote',vote);
      var a = $( e.currentTarget )
      var score_div = a.next();
      var score = score_div.html();
      score = parseInt(score);
      score = score + 1;
      score_div.html(score);
      a.removeClass( "vote_down" ).addClass( "vote_down_done" );
      $("#"+message).find(".vote_up").removeClass( "vote_up" ).addClass( "vote_up_done" );
    }
    
  }
});
Template.messages.events({'click a.vote_down': function (e) {
    // Prevent default browser form submit
    e.preventDefault();
   
    // Get value from form element
    const target = e.currentTarget;
    var message = target.attributes[2].nodeValue;
    var channel = target.attributes[3].nodeValue;
    var vote = {
      'value':1,
      'type':'down',
      'message': message,
      'channel': channel
    };
    if(!hasVoted(message)){
      Meteor.call('newVote',vote);
      var a = $( e.currentTarget )
      var score_div = a.next();
      var score = score_div.html();
      score = parseInt(score);
      score = score + 1;
      score_div.html(score);
      a.removeClass( "vote_down" ).addClass( "vote_down_done" );
      $("#"+message).find(".vote_up").removeClass( "vote_up" ).addClass( "vote_up_done" );
    }
    
  }
});

Template.messages.events({'click a.emoji': function (e) {
    // Prevent default browser form submit
    e.preventDefault();
   
    // Get value from form element
    const target = e.currentTarget;
    var emoji = $( target ).html();
    var currentText = $( "#input-box_text" ).val(); 
    
    $( "#input-box_text" ).val(currentText + ' ' + emoji);
  }
});

Template.loginPage.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    }
});

Template.profile.events({
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});

Template.loggedin_user.events({
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});

Template.footer.events({
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});

Template.friends.events({
    'click .friendcheckbox': function(e) {
        const target = e.currentTarget;
        var channelfriends = [];
        
        if(Session.get("channelfriends")){
          channelfriends = Session.get("channelfriends");
        }
        channelfriends.push(target.id);
        Session.set("channelfriends", channelfriends);
        debugger;
    }
});



