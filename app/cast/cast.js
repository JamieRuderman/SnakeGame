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

  /* Parent Object ??????? @TODO -> implement */
  app.Member = function() {
    var self = {
          position: null,
          segments: [],
          turnChance: 0.9,
          length: app.state.obstaclesLength // {option} number of segments
        },
        direction = null;

    self.init = function() {
      self.create();
    };

    self.create = function() {
      direction = self.pickDirection();
      self.each(function(segment) {
        self.growSegment(self.position);
      });
    };

    self.growSegment = function(from, turn) {
      var position = from && from.slice() || app.hit.randomFree(),
          seed = Math.random(),
          change;

      if (seed > self.turnChance || turn) {
        change = self.pickDirection();
        direction = app.hit.noReverse(direction, change);
      }

      position = app.hit.move(direction, position);

      if (app.hit.occupied(position)) {
        self.growSegment(self.position, true);
      } else {
        self.position = position;
        self.addSegment();
      }
    };

    self.pickDirection = function() {
      var seed = Math.random();
      if (seed > 0.75) return 'left';
      else if (seed > 0.5) return 'right';
      else if (seed > 0.25) return 'up';
      else return 'down';
    };

    // movement method
    self.advance = function() {
      self.growSegment(self.position);
      self.checkLength();
    };

    // movement method
    self.checkLength = function() {
      if (self.segments.length > self.length) {
        self.segments.pop();
        self.checkLength();
      }
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

    return self;
  };

})(SnakeGame);