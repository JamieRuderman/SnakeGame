var SnakeGame = SnakeGame || {};

(function(app){

  /*
    Cast collection
      @param options {
        member: Member class object,
        length: Number of objects in the collection
      }
  */
  app.Cast = function(options) {

    var self = {
          array: [],
          size: [1, 1],
          length: 1,   // {option} number of members
          member: null // {option} member object class
        },
        serial = 0;

    self.collection = function(callback) {
      for (var i = 0, len = self.array.length; i < len; i++) {
        if (callback && self.array[i]) callback(self.array[i], i);
      }
    };

    self.each = function(callback) {
      self.collection(function(member, index) {
        if (member) {
          member.each(function(segment) {
            callback(segment, index);
          });
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
      if (target !== false) self.array.splice(target, 1);
    };

    /* Private -------------- */

    function init() {
      $.extend(self, options);
      self.array = [];
      for (var i = 0; i < self.length; i++) {
        self.array.push(new self.member({
          id: ++serial,
          onDeath: self.remove
        }));
      }
    }

    init();

    return self;

  };

})(SnakeGame);