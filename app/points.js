var SnakeGame = SnakeGame || {};

(function(app){

  app.Points = function() {
    var self = {
      points: [],

      size: [1, 1],
      length: app.state.length
    };

    self.score = function(position) {
      self.remove(position);
      self.add();
    };

    self.add = function(point) {
      if (app.hit.full())
        app.controller.gameover();
      else
        self.points.push(point || app.hit.randomFree());
    };

    self.remove = function(position) {
      self.each(function(point, index) {
        if (point[0] == position[0] && point[1] == position[1]) {
          self.points.splice(index, 1);
        }
      });
    };

    self.each = function(callback) {
      for (var i = 0, len = self.points.length; i < len; i++) {
        if (self.points[i] !== undefined) {
          callback(self.points[i], i);
        }
      }
    };

    self.reset = function() {
      self.points = [];
    };

    return self;
  };

})(SnakeGame);
