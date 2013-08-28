(function(app){

  /*
    Members are made up of segments
      position [x, y, d]
        x position
        y position
        f direction from (up, right, down, left)
        t direction to
  */
  app.Member = function(options) {
    var self = {
          kind: 'member',
          position: null,
          segments: [],
          length: app.state.obstaclesLength // {option} number of segments
        };

    // implement event callbacks
    $.extend(self, app.eventTriggers);

    self.init = function() {
      $.extend(self, options);
      self.reset();
    };

    self.move = function(position) {
      self.position = position;
      self.addSegment();
      self.checkLength();
    };

    // movement method
    self.checkLength = function() {
      if (self.segments.length > self.length) {
        self.segments.pop();
        self.checkLength();
      }
    };

    self.turn = function(direction) {
      if (!direction) return self.position[2];
      return app.hit.isReverse(self.position[2], direction) ? self.position[2] : direction;
    };

    self.addSegment = function() {
      self.position && self.segments.unshift(self.position.slice());
    };

    self.each = function(callback) {
      for (var i = 0, len = self.segments.length; i < len; i++) {
        callback(self.segments[i], i);
      }
    };

    self.alive = function() {
      return self.segments.length > 0;
    };

    self.hit = function() {
      app.state.damage ? self.damage() : self.die();
    };

    self.damage = function() {
      app.state.scores[self.id]--;
      self.segments.pop();
      self.length--;
      if (self.segments.length === 0)
        self.die();
    };

    self.reset = function() {
      self.length = app.state.length;
      self.segments = [];
    };

    return self;
  };

})(Snake || {});