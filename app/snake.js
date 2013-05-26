var SnakeGame = SnakeGame || {};

(function(app){

  app.Snake = function() {
    var self = {
      size: [1, 1],
      position: [0, 0],
      segments: [],
      length: app.state.length
    };

    self.init = function() {};

    self.advance = function() {
      self.addSegment();
      self.checkLength();
    };

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
