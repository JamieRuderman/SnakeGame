var SnakeGame = SnakeGame || {};

(function(app){

  app.Player = function() {
    var self = new app.Member();

    $.extend(self, {
      size: [1, 1],
      position: [0, 0],
      segments: [],
      length: app.state.length
    });

    self.init = function() {};

    self.advance = function() {
      self.addSegment();
      self.checkLength();
    };

    self.reset = function() {
      self.length = app.state.length;
      self.segments = [];
    };

    self.init();

    return self;
  };

})(SnakeGame);
