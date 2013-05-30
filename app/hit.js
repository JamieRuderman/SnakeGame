var SnakeGame = SnakeGame || {};

(function(app){

  app.Hit = function() {

    var self = {};

    self.check = function(typeName, position) {
      var type = app[typeName],
          hit = false;

      if (!type) return hit;

      type.each(function(item) {
        if (item[0] == position[0] && item[1] == position[1]) {
          hit = true;
        }
      });

      return hit;
    };

    self.occupied = function(position) {
      var types = ['snake', 'points', 'obstacle'],
          occupied = false;

      for (var i = types.length - 1; i >= 0; i--) {
        if (self.check(types[i], position)) {
          occupied = true;
          break;
        }
      }
      return occupied;
    };

    /*
      @param max array [x max value, y max value]
      @param occupiedCallback function add validation callback
    */
    self.randomFree = function() {
      var point = [
        Math.round(Math.random() * (app.stage.size[0] -1)),
        Math.round(Math.random() * (app.stage.size[1] -1))
      ];

      if (self.occupied(point)) {
        return self.randomFree();
      }
      else {
        return point;
      }
    };

    self.full = function() {
      var max = app.stage.size[0] * app.stage.size[1],
          total = app.points.points.length + app.snake.segments.length;
      return total >= max;
    };

    return self;
  };


})(SnakeGame);