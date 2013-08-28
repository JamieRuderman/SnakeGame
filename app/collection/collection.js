(function(app){

  /*
    Cast collection
      @param options {
        member: Member class object added to the cast,
        length: Number of objects to be added to the collection
      }
  */
  app.Collection = function(options) {

    var self = {
          array: [],
          count: 1,     // (option) number of members to create
          member: null, // {option} member object class
          serial: 0
        };

    /* Iterate over the members of the cast */
    self.each = function(callback) {
      for (var i = 0, len = self.array.length; i < len; i++) {
        if (callback && self.array[i]) callback(self.array[i], i);
      }
    };

    self.length = function() {
      return self.array.length;
    };

    /* Iterate over selected type of members in cast */
    self.select = function(type, callback) {
      self.each(function(member, i) {
        if (member.type == type) {
          callback(member, i);
        }
      });
    };

    /* Removes a member of the cast */
    self.remove = function(id) {
      var target = false;
      self.each(function(member, i) {
        if (member.id == id) {
          target = i;
        }
      });
      if (target !== false) {
        delete self.array[target];
        self.array.splice(target, 1);
      }
    };

    return self;

  };

})(Snake || {});