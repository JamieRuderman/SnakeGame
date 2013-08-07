(function(app){

  /*
    Cast collection
      @param options {
        member: Member class object added to the cast,
        length: Number of objects to be added to the collection
      }
  */
  app.Cast = function(options) {

    var self = {
          array: [],
          count: 1,    // (option) number of members to create
          member: null // {option} member object class
        },
        serial = 0;

    /* Iterate over the members of the cast */
    self.collection = function(callback) {
      for (var i = 0, len = self.array.length; i < len; i++) {
        if (callback && self.array[i]) callback(self.array[i], i);
      }
    };

    self.each = function(callback) {
      self.collection(function(member, index) {
        if (member) { // really?
          member.each(function(segment) {
            callback(segment, index);
          });
        }
      });
    };

    self.select = function(type, callback) {
      self.collection(function(member) {
        if (member.type == type) {
          callback(member);
        }
      });
    };

    self.remove = function(id) {
      var target = false;
      self.collection(function(member, i) {
        if (member.id == id) {
          target = i;
        }
      });
      if (target !== false) {
        delete self.array[target];
        self.array.splice(target, 1);
      }
    };

    /* Private -------------- */

    function init() {
      for (var i = 0; i < options.length; i++) {
        cast(options[i]);
      }
    }

    /* add members to cast and provide global name */
    function cast(type) {
      var members = [],
          count = app.state[type],
          constructor;

      for (var c = 0; c < count; c++) {
        constructor = type.caps().single();
        members.push(new app[constructor]({
          id: ++serial,
          onDeath: self.remove
        }));
      }

      // add to the cast
      self.array = self.array.concat(members);

      // assign global name shortcuts
      app[type] = members;
      app[type].collection = function(callback) {
        self.select(type, callback);
      }
    }

    init();

    return self;

  };

})(Snake || {});