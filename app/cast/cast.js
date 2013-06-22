var SnakeGame = SnakeGame || {};

(function(app){

  /*
    Cast collection
      @param member: Member class object
  */
  app.Cast = function(member) {

    var self = {
          array: [],
          size: [1, 1],
          length: 1,   // {option} number of members
          member: null // {option} member object class
        };

    self.collection = function(callback) {
      for (var i = 0, len = self.array.length; i < len; i++) {
        if (callback) callback(self.array[i], i);
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

    /* Private -------------- */

    function init() {
      self.member = member || {};
      self.array = [];
      for (var i = 0; i < self.length; i++) {
        self.array.push(new self.member());
      }
    }

    init();

    return self;

  };

})(SnakeGame);