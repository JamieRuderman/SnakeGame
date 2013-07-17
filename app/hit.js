var SnakeGame = SnakeGame || {};

(function(app){

  app.hit = {

    // @TODO - fix this so that it uses the grid
    check: function(typeName, position) {
      var type = app[typeName],
          hit = false;

      if (!type) return hit;

      type.each(function(item) {
        if (item[0] == position[0] && item[1] == position[1]) {
          hit = true;
        }
      });

      return hit;
    },

    occupied: function(position) {
      var types = ['player', 'obstacles', 'bots', 'border'],
          occupied = false;

      for (var i = 0; i < types.length; i++) {
        if (this.check(types[i], position)) {
          occupied = true;
          break;
        }
      }
      return occupied;
    },

    move: function(direction, position) {
      switch (direction) {
        case 'left':
          position[0] -= 1;
          break;
        case 'right':
          position[0] += 1;
          break;
        case 'up':
          position[1] -= 1;
          break;
        case 'down':
          position[1] += 1;
          break;
      }
      return this.wrap(position);
    },

    wrap: function(position) {
      // left / right
      if (position[0] < 0) {
        position[0] = app.stage.size[0] -1;
      } else if (position[0] >= app.stage.size[0]) {
        position[0] = 0;
      }

      // up / down
      if (position[1] < 0) {
        position[1] = app.stage.size[1] -1;
      } else if (position[1] >= app.stage.size[1]) {
        position[1] = 0;
      }

      return position;
    },

    /*
      @param max array [x max value, y max value]
      @param occupiedCallback function add validation callback
    */
    randomFree: function() {
      var point = [
        Math.round(Math.random() * (app.stage.size[0] -1)),
        Math.round(Math.random() * (app.stage.size[1] -1))
      ];

      if (this.occupied(point)) {
        return this.randomFree();
      }
      else {
        return point;
      }
    },

    noReverse: function(moving, direction) {
      if (moving == 'left' && direction =='right') return 'left';
      else if (moving == 'right' && direction =='left') return 'right';
      else if (moving == 'up' && direction =='down') return 'up';
      else if (moving == 'down' && direction =='up') return 'down';
      return direction;
    },

    full: function() {
      var max = app.stage.size[0] * app.stage.size[1],
          total = app.points.points.length + app.player.segments.length;
      return total >= max;
    }

  };


})(SnakeGame);