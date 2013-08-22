var Snake = Snake || {};

(function(app){

  app.hit = {

    advance: function(position) {
      switch (position[2]) {
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

    /* Adds the direction to the position when moving to an adjacent point */
    addDirection: function(from, to) {
      var direction;
      if      (from[0] > to[0]) direction = 'left';
      else if (from[0] < to[0]) direction = 'right';
      else if (from[1] < to[1]) direction = 'down';
      else if (from[1] > to[1]) direction = 'up';
      else direction = 'none';
      return [to[0], to[1], direction];
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
      var position = [
        Math.round(Math.random() * (app.stage.size[0] -1)),
        Math.round(Math.random() * (app.stage.size[1] -1)),
        this.randomDirection()
      ];
      return (app.grid.isOccupied(position)) ? this.randomFree() : position;
    },

    randomDirection: function() {
      return app.state.directions[Math.round(Math.random() * 3)];
    },

    isReverse: function(moving, direction) {
      return (moving == 'left'  && direction =='right') ||
             (moving == 'right' && direction =='left' ) ||
             (moving == 'up'    && direction =='down' ) ||
             (moving == 'down'  && direction =='up'   );
    },

    opposite: function(direction) {
      switch (direction) {
        case 'left' : return 'right';
        case 'right': return 'left';
        case 'up'   : return 'down';
        case 'down' : return 'up';
      }
      return 'none';
    },

    full: function() {
      var occupied = app.grid.length(),
          possible = app.state.stageSize[0] * app.state.stageSize[1];
      return occupied >= possible;
    }

  };


})(Snake);