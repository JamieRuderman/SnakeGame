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
      length: app.state.length,
      powerupCount: 0
    });

    function init() {
      $.extend(self, options);
      app.events.register(handle, 'game');
      self.center();
    }

    self.advance = function(direction) {
      var position = self.position.slice();
      position[2] = direction;
      position = app.hit.advance(position);
      if (!self.checkHit(position)) {
        self.move(position);
      }
      powerupCountdown();
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
          if (self.powerupCount === 0) {
            self.hit();
            return true;
          }
          return false;

        case 'points':
          self.length += app.state.grow;
          app.state.scores[self.id] += app.state.scorePointValue;
          app.events.trigger('score', position);
          return false;

        case 'powerups':
          self.powerupCount += app.state.powerupDurration;
          app.events.trigger('powerup', position);
          return false;

        case 'doorways':
          var pair = app.doorways.getPair(position);
          self.move(pair);
          return true;

        case 'blocks':

      }
    };

    self.die = function() {
      app.events.trigger('gameover');
    };

    handle.reset = function() {
      app.state.scores[self.id] = 0;
      self.length = app.state.length;
      self.segments = [];
      self.center();
      self.addSegment(self.position);
    };

    function powerupCountdown() {
      if (self.powerupCount > 0) self.powerupCount--;
    }

    init();

    return self;
  };

})(Snake);
