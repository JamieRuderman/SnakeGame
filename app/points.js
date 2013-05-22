var SnakeGame = SnakeGame || {};

(function(app){

  app.Points = function() {
    var self = {
      points: [],

      size: [1, 1],
      length: app.config.length
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
        console.log('space occupied', point);
        self.add(max, occupiedCallback);
      }
      else {
        console.log('add point', point);
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

    return self;
  };

})(SnakeGame);
