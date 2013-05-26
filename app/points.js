var SnakeGame = SnakeGame || {};

(function(app){

  app.Points = function() {
    var self = {
      points: [],

      size: [1, 1],
      length: app.state.length
    };

    /*
      @param max array [x max value, y max value]
      @param occupiedCallback function add validation callback
    */
    self.add = function(max, occupiedCallback) {
      var point = [
        Math.round(Math.random() * (max[0] -1)),
        Math.round(Math.random() * (max[1] -1))
      ];

      if (occupiedCallback(point)) {
        self.add(max, occupiedCallback);
      }
      else {
        self.points.push(point);
      }
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
      app.controller.addPoint();
    };

    return self;
  };

})(SnakeGame);
