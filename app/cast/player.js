var Snake = Snake || {};

(function(app){

  app.Player = function(options) {
    var self = new app.Member(options),
        handle = {};

    $.extend(self, {
      type: 'players',
      display: 'Player',
      position: [0, 0, 'right'],
      segments: [],
      length: app.state.length
    });

    function init() {
      $.extend(self, options);
      app.events.register(handle, 'game');
      self.center();
    }

    self.advance = function(direction) {
      var next = self.position.slice();
      next[2] = direction;
      next = app.hit.move(next);
      if (!self.checkHit(next)) {
        self.position = next;
        self.addSegment();
        self.checkLength();
      }
    };

    self.center = function() {
      self.position = [
        Math.round(app.stage.size[0] / 2) - 1,
        Math.round(app.stage.size[1] / 2) - 1,
        app.hit.randomDirection()
      ];
    };

    /* returns true if there was a hit */
    self.checkHit = function(position) {
      var cell = app.grid.get(position);

      switch (cell.type) {
        case 'players':
        case 'obstacles':
        case 'bots':
        case 'borders':
          app.state.damage ? self.damage() : app.events.trigger('gameover');
          return true;

        case 'points':
          self.length += app.state.grow;
          app.state.scores[self.id] += app.state.scorePointValue;
          app.events.trigger('score', position);
          return false;
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
