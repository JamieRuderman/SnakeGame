var SnakeGame = SnakeGame || {};

(function(app){

  /* Collection ------------------------ */
  app.obstacles = {

    array: [],
    size: [1, 1],

    collection: function(callback) {
      for (var i = 0, len = this.array.length; i < len; i++) {
        if (callback) callback(this.array[i], i);
      }
    },

    each: function(callback) {
      this.collection(function(obstacle, index) {
        if (obstacle) {
          obstacle.each(function(segment) {
            callback(segment, index);
          });
        }
      });
    },

    init: function() {
      this.array = [];
      for (var i = 0; i < app.state.obstacles; i++) {
        this.array.push(new app.Obstacle());
      }
    }

  };

  /* Object ------------------------ */
  app.Obstacle = function() {
    var self = {
          position: null,
          segments: [],
          length: app.state.obstaclesLength
        },
        direction = null;

    var TURN_CHANCE = 0.9;

    self.init = function() {
      self.create();
    };

    self.create = function() {
      direction = self.pickDirection();
      self.each(function(segment) {
        self.growSegment(self.position);
      });
    };

    self.growSegment = function(from) {
      var position = from || app.hit.randomFree(),
          seed = Math.random(),
          change;

      if (seed > TURN_CHANCE) {
        change = self.pickDirection();
        direction = app.hit.noReverse(direction, change);
      }

      self.position = app.hit.move(direction, position);
      self.addSegment();
    };

    self.pickDirection = function() {
      var seed = Math.random();
      if (seed > 0.75) return 'left';
      else if (seed > 0.5) return 'right';
      else if (seed > 0.25) return 'up';
      else return 'down';
    };

    self.addSegment = function() {
      self.segments.unshift(self.position.slice());
    };

    self.each = function(callback) {
      for (var i = 0, len = self.length; i < len; i++) {
        callback(self.segments[i], i);
      }
    };

    self.reset = function() {
      self.segments = [];
    };

    self.init();

    return self;
  };

})(SnakeGame);