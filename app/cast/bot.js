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

      switch (self.aiMode) {
        case 'search':
          result = self.search();
          if (result)
            this.position = result;
          else if (!noSwitch)
            this.setAi('wander');
          break;
        case 'wander':
          result = self.wander(self.position);
          if (!result && !noSwitch)
            this.setAi('search');
          break;
      }

      self.checkHit();
      self.addSegment();
      self.checkLength();
    };

    //GENERAL AI FUNCTION
    self.setAi = function(mode) {
      console.log('set ai', mode);
      this.aiMode = mode;
      this.advance(true);
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
          // self.length += app.state.grow;
          app.events.trigger('steal', self.position);
      }
    };

    self.die = function() {
      app.audio.play('kill');
      app.state.score += app.state.killPointValue;
      self.trigger('death', [self.id]);
    };

    handle.score = function() {
      // clear the current path to trigger a new one
      self.path = [];
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