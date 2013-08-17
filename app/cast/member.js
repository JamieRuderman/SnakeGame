(function(app){

  /*
    Members are made up of segments
      position [x, y, d]
        x position
        y position
        d direction (up, right, down, left)
  */
  app.Member = function(options) {
    var self = {
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

    // movement method
    self.checkLength = function() {
      if (self.segments.length > self.length) {
        self.segments.pop();
        self.checkLength();
      }
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

    self.reset = function() {
      self.length = app.state.length;
      self.segments = [];
    };

    return self;
  };

})(Snake || {});