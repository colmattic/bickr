function newChannel(){
  
  this.friends =[];

  this.updatefriends= function(friend){
    this.friends.push(friend);
  };
  this.subject='';

  this.updateSubject=function(subject){
    this.subject = subject;
  };

  this.private=false;

  this.updatePrivacy=function(bool){
    this.private = bool;
  };

  this.lengthofchannel=0;

  this.updateLength=function(){
    this.lengthofchannel = bool;
  };
}