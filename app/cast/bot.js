var Snake = Snake || {};

(function(app){

  app.Bot = function(options) {

    var self = new app.Member(options),
        handle = {},
        size = app.state.stageSize;

    $.extend(self, {
      type:'bots',
      length: app.state.length,
      turnChance: 0.90,
      aiMode: 'wander'  // search || wander
    });

    // implements ai
    $.extend(self, app.aiSearch, app.aiWander);

    parent.init = self.init;

    self.init = function() {
      parent.init();
      app.events.register(handle);
    };

    self.advance = function(noSwitch) {
      var result;

      // GENERAL AI
      switch (self.aiMode) {
        case 'search':
          result = self.search();
          if (result) {
            self.position = result;
          }
          else if (!noSwitch) {
            self.setAi('wander');
            self.advance(true);
          }
          break;
        case 'wander':
          result = self.wander(self.position);
          if (!result && !noSwitch && self.closeBy()) {
            self.setAi('search');
            self.advance(true);
          }
          break;
      }

      self.checkHit();
      self.addSegment();
      self.checkLength();
    };

    // GENERAL AI
    self.setAi = function(mode) {
      // console.log(this.id, 'set ai', mode);
      // clear the current path to trigger a new one
      self.path = [];
      self.resetDirections();
      self.aiMode = mode;
    };

    // GENERAL AI
    self.closeBy = function() {
      var stage = (app.state.stageSize[0] + app.state.stageSize[1]) / 2,
          close = stage / 2, // 50% of stage is close
          point = app.points.getClosest(),
          distance = self.distance(self.position, point);
      return close > distance;
    };

    // GENERAL AI - euclidean distance calculation
    self.distance = function(a, b) {
      var x = a[0] - b[0],
          y = a[1] - b[1];
      return Math.sqrt(x * x + y * y);
    };

    self.checkHit = function() {
      var cell = app.grid.get(self.position);

      switch (cell) {
        case 'players':
        case 'obstacles':
        case 'bots':
        case 'borders':
            console.log('die');
            self.die();
          break;
        case 'points':
          self.length += app.state.grow;
          app.events.trigger('steal', self.position);
      }
    };

    self.die = function() {
      app.audio.play('kill');
      app.state.score += app.state.killPointValue;
      self.trigger('death', [self.id]);
    };

    // GENERAL AI
    handle.steal = handle.score = function() {
      // only if they are within 33% of the stage size
      if (self.closeBy()) {
        self.setAi('search');
      }
      else {
        self.setAi('wander');
      }

    };

    handle.reset = function() {
      self.length = app.state.length;
      self.segments = [];
      self.path = [];
    };

    self.init();

    return self;
  };

})(Snake);


/*

    self.create = function() {
      direction = pickDirection();
    };


*/