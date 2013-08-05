var Snake = Snake || {};

(function(app){

  app.hit = {

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
      var position = [
        Math.round(Math.random() * (app.stage.size[0] -1)),
        Math.round(Math.random() * (app.stage.size[1] -1))
      ];
      return (app.grid.occupied(position)) ? this.randomFree() : position;
    },

    noReverse: function(moving, direction) {
      if (moving == 'left' && direction =='right') return 'left';
      else if (moving == 'right' && direction =='left') return 'right';
      else if (moving == 'up' && direction =='down') return 'up';
      else if (moving == 'down' && direction =='up') return 'down';
      return direction;
    },

    // fixme use grid
    full: function() {
      var occupied = app.grid.length(),
          possible = app.state.stageSize[0] * app.state.stageSize[1];
      return occupied >= possible;
    }

  };


})(Snake);