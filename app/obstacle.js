var SnakeGame = SnakeGame || {};

(function(app){

  app.Obstacle = function() {
    var self = {
          size: [1, 1],
          position: null,
          segments: [],
          length: 20
        };

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
          seed = Math.random();

      if (seed > 0.5) {
        position[0] += (seed > 0.75) ? -1 : 1;
      }
      else {
        position[1] += (seed > 0.25) ? -1 : 1;
      }

      self.position = position;
      self.addSegment();
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
