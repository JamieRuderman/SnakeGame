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

    /* Private -------------- */

    function init() {
      $.extend(self, options);
      self.array = [];
      for (var i = 0; i < self.length; i++) {
        self.array.push(new self.member());
      }
    }

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
        directions = null,
        direction = null;

    self.init = function() {
      self.reset();
      self.create();
    };

    self.create = function() {
      direction = pickDirection();
      self.each(function() {
        self.growSegment(self.position);
      });
    };

    self.growSegment = function(from, turn) {
      var position = !!from && from.slice() || app.hit.randomFree(),
          newDirection = direction,
          seed = Math.random(),
          change;

      if (seed > self.turnChance || turn) {
        change = pickDirection();
        newDirection = app.hit.noReverse(newDirection, change);
      }

      position = app.hit.move(newDirection, position);

      if (app.hit.occupied(position)) {
        checkDirections();
        self.growSegment(self.position, true);
      }
      else {
        self.position = position;
        direction = newDirection;
        self.addSegment();
        resetDirections();
      }
    };

    // movement method
    self.advance = function() {
      if (self.alive()) {
        self.growSegment(self.position);
      }
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

    self.die = function() {
      self.length = 0;
    };

    self.alive = function() {
      return self.length !== 0;
    };

    self.reset = function() {
      self.length = app.state.obstaclesLength;
      self.segments = [];
      resetDirections();
    };

    /* Private -------------- */

    function pickDirection() {
      var seed = Math.random(),
          available = directions.length,
          index = Math.ceil(seed * available) -1,
          pick = null;

      if (index >= 0) {
        pick = directions[index];
        directions.splice(index, 1);
      }

      return pick;
    }

    function resetDirections() {
      directions = ['left', 'right', 'up', 'down'];
    }

    function checkDirections() {
      if (directions.length === 0) self.die();
    }

    return self;
  };

})(SnakeGame);