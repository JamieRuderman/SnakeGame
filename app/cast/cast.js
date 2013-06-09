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
          name: null,  // member name
          member: null // member object class
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

    // Private -------------

    init = function() {
      $.extend(self, options);
      self.array = [];
      for (var i = 0; i < self.length; i++) {
        self.array.push(new self.member());
      }
    };

    init();

    return self;

  };

  /* Object ------------------------ */
  app.Member = function() {
    var self = {
          position: null,
          segments: [],
          length: app.state.obstaclesLength
        },
        direction = null;

    var TURN_CHANCE = 0.9;

    self.init = function() {
      self.create();
    };

    self.create = function() {
      direction = self.pickDirection();
      self.each(function(segment) {
        self.growSegment(self.position);
      });
    };

    self.growSegment = function(from) {
      var position = from || app.hit.randomFree(),
          seed = Math.random(),
          change;

      if (seed > TURN_CHANCE) {
        change = self.pickDirection();
        direction = app.hit.noReverse(direction, change);
      }

      self.position = app.hit.move(direction, position);
      self.addSegment();
    };

    self.pickDirection = function() {
      var seed = Math.random();
      if (seed > 0.75) return 'left';
      else if (seed > 0.5) return 'right';
      else if (seed > 0.25) return 'up';
      else return 'down';
    };

    self.addSegment = function() {
      self.segments.unshift(self.position.slice());
    };

    self.each = function(callback) {
      for (var i = 0, len = self.length; i < len; i++) {
        callback(self.segments[i], i);
      }
    };

    self.reset = function() {
      self.segments = [];
    };

    self.init();

    return self;
  };

})(SnakeGame);