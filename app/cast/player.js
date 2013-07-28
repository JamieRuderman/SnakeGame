var Snake = Snake || {};

(function(app){

  app.Player = function() {
    var self = new app.Member(),
        handle = {};

    $.extend(self, {
      size: [1, 1],
      position: [0, 0],
      segments: [],
      length: app.state.length
    });

    function init() {
      app.events.register(handle);
      self.center();
    };

    self.advance = function() {
      self.addSegment();
      self.checkLength();
    };

    self.center = function() {
      self.position = [
        Math.round(app.stage.size[0] / 2) - 1,
        Math.round(app.stage.size[1] / 2) - 1
      ];
    };

    handle.reset = function() {
      self.length = app.state.length;
      self.segments = [];
      self.center();
      self.addSegment(self.position);
    };

    init();

    return self;
  };

})(Snake);
