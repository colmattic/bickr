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
    
    var p = $("#p").is(":checked") ? true : false;


    var channel = {
      'subject':subject,
      'u2':target.u2.value,
      'u3':target.u3.value,
      'p':p
    };

    Meteor.call('newChannel',channel);
 
    // Clear form
    target.subject.value = '';
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

Template.createpost.events({'submit .new-post': function (e) {
    // Prevent default browser form submit
    e.preventDefault();
 
    // Get value from form element
    const target = e.target;
    
    
    // Insert a channel into the collection
    
    //make string lower
    var text = target.text.value;
    var name = text.toLowerCase();
    name = name.replace(/\s/g, '');
    
    var post = {
      'text':text,
      'name':name,
      'p':target.p.value,
      'type':'p'
    };

    Meteor.call('newPost',post);
    // Clear form
    target.text.value = '';
  },
});


Template.post.events({'click a.followpost': function (e) {
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

Template.users.events({'click a.followuser': function (e) {
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
    const target = e.target;
    
    var vote = {
      'up':1,
    };

    Meteor.call('newVote',vote);
  
  }
});
Template.messages.events({'click a.vote_down': function (e) {
    // Prevent default browser form submit
    e.preventDefault();
   
    // Get value from form element
    const target = e.target;
    var vote = {
      'down':0,
    };
    Meteor.call('newVote',vote);
  
  }
});
