var SnakeGame = SnakeGame || {};

(function(app){

  app.Member = function(options) {
    var self = {
          // events: app.events,
          position: null,
          segments: [],
          size: [1, 1],
          turnChance: 0.9,
          length: app.state.obstaclesLength // {option} number of segments
        },
        directions = null,
        direction = null;

    // implement event callbacks
    $.extend(self, app.eventTriggers);

    self.init = function() {
      $.extend(self, options);
      self.reset();
      self.create();
    };

    self.create = function() {
      direction = pickDirection();
      // self.grow(self.position);
    };

    self.grow = function(from, turn) {
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
        self.grow(self.position, true);
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
      self.grow(self.position);
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
      for (var i = 0, len = self.segments.length; i < len; i++) {
        callback(self.segments[i], i);
      }
    };

    self.die = function() {
      self.trigger('death', [self.id]);
    };

    self.alive = function() {
      return self.segments.length > 0;
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