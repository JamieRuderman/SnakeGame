var Snake = Snake || {};

(function(app){

  app.Player = function(options) {
    var self = new app.Member(options),
        handle = {};

    $.extend(self, {
      type: 'players',
      display: 'Player',
      position: [0, 0],
      segments: [],
      length: app.state.length
    });

    function init() {
      $.extend(self, options);
      app.events.register(handle,'game');
      self.center();
    }

    self.advance = function(direction) {
      self.position = app.hit.move(direction, self.position);
      self.checkHit();
      self.addSegment();
      self.checkLength();
    };

    self.center = function() {
      self.position = [
        Math.round(app.stage.size[0] / 2) - 1,
        Math.round(app.stage.size[1] / 2) - 1
      ];
    };

    self.checkHit = function() {
      var cell = app.grid.get(self.position);

      switch (cell) {
        case 'players':
        case 'obstacles':
        case 'bots':
        case 'borders':
          app.events.trigger('gameover');
          break;
        case 'points':
          self.length += app.state.grow;
          app.state.scores[self.id] += app.state.scorePointValue;
          app.events.trigger('score', self.position);
      }
    };

    handle.reset = function() {
      app.state.scores[self.id] = 0;
      self.length = app.state.length;
      self.segments = [];
      self.center();
      self.addSegment(self.position);
    };

    init();

    return self;
  };

})(Snake);
