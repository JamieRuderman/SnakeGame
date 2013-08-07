var Snake = Snake || {};

(function(app){

  app.Obstacle = function() {

    var self = new app.Member();

    self.type = 'obstacles';
    self.length = app.state.obstaclesLength;

    self.create = function() {
      self.every(function() {
        self.grow(self.position);
      });
    };

    self.every = function(callback) {
      for (var i = 0; i < self.length; i++) {
        callback(self.segments[i], i);
      }
    };

    self.grow = function(from, turn) {
      var position = !!from && from.slice() || app.hit.randomFree(),
          newDirection = direction,
          seed = Math.random(),
          change, cell, point;

      if (seed > self.turnChance || turn) {
        change = pickDirection();
        newDirection = app.hit.noReverse(newDirection, change);
      }

      position = app.hit.move(newDirection, position);
      cell = app.grid.get(position);

      // avoid occupied
      if (cell && cell != 'points') {
        if (dead()) {
          self.die();
        } else {
          self.grow(self.position, true); // recursion
        }
      }
      // move
      else {
        // point
        if (cell == 'points') {
          app.points.score(position);
          app.state.score -= app.state.scorePointValue;
          app.audio.play('steal');
        }
        self.position = position;
        direction = newDirection;
        self.addSegment();
        self.resetDirections();
      }
    };

    self.init();

    return self;
  };

})(Snake);