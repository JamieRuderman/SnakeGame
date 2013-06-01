var SnakeGame = SnakeGame || {};

(function(app){

  app.Obstacle = function() {
    var self = {
          size: [1, 1],
          position: null,
          segments: [],
          length: 40
        },
        direction = null;

    var TURN_CHANCE = 0.75;

    self.init = function() {
      self.create();
    };

    self.create = function() {
      self.each(function(segment) {
        self.growSegment(self.position);
      });
    };

    self.growSegment = function(from) {
      var position = from || app.hit.randomFree(),
          seed = Math.random(),
          change;

      if (!direction) {
        direction = self.pickDirection();
      }

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
        callback(self.segments[i]);
      }
    };

    self.reset = function() {
      app.snake.length = app.state.length;
      self.segments = [];
    };

    self.init();

    return self;
  };

})(SnakeGame);
