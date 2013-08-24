var Snake = Snake || {};

(function(app){

// TODO: make defaults settings and apply defaults method

  app.Bot = function(options) {

    var self = new app.Member(options),
        handle = {},
        size = app.state.stageSize,
        respawnCount = 0;

    $.extend(self, {
      type:'bots',
      display: 'Bot',
      length: app.state.length,
      dead: false,
      respawn: true
    });

    // implements ai
    $.extend(self, app.ai, app.aiSearch, app.aiWander);

    parent.init = self.init;

    self.init = function() {
      parent.init();
      app.events.register(handle, 'game');
    };

    self.advance = function(noSwitch) {
      var next;
      if (self.respawning()) return;

      next = self.aiAdvance(this.position);
      if (!self.checkHit(next)) {
        self.move(next);
      }
    };

    self.respawning = function() {
      if (!self.dead) return false;

      if (++respawnCount > app.state.respawnFrameDelay) {
        respawnCount = 0;
        self.dead = false;
      }

      return true;
    };

    self.checkHit = function(position) {
      var cell = app.grid.get(position);

      switch (cell.type) {
        case 'players':
        case 'obstacles':
        case 'bots':
        case 'borders':
          self.hit();
          return true;

        case 'points':
          self.length += app.state.grow;
          app.state.scores[self.id] += app.state.stealPointValue;
          app.events.trigger('steal', position);
          return false;
      }
    };

    self.die = function() {
      self.dead = true;
      app.audio.play('kill');
      app.state.scores[self.id] -= app.state.stealPointValue;
      self.awareness += ((Math.PI/2) - self.awareness) * 0.5;
      self.length = app.state.length;
      self.segments = [];
      self.path = [];
      self.position = null;
    };

    /* Event handling ----- */

    handle.steal = handle.score = function() {
      if (self.dead) return;

      if (self.closeBy(self.position)) {
        self.aiSet('search');
      }
      else {
        self.aiSet('wander');
      }
    };

    handle.reset = function() {
      app.state.scores[self.id] = 0;
      self.length = app.state.length;
      self.segments = [];
      self.path = [];
      self.position = app.hit.randomFree();
    };

    self.init();

    return self;
  };

})(Snake);
