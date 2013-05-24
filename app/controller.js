var SnakeGame = SnakeGame || {};

(function(app){

  app.Controller = function() {
    var self = {},
        stage = app.stage,
        snake = app.snake,
        points = app.points,
        direction = app.config.direction;

    self.init = function() {
      $(window).on('keydown', self.changeDirection);
      self.center(snake);
      self.addPoint();
    };

    self.move = function() {
      switch (direction) {
        case 'left':
          snake.position[0] -= 1;
          break;
        case 'right':
          snake.position[0] += 1;
          break;
        case 'up':
          snake.position[1] -= 1;
          break;
        case 'down':
          snake.position[1] += 1;
          break;
      }

      self.checkBorder();
      self.checkHit(snake.position);
      snake.advance();
    };

    self.center = function(sprite) {
      sprite.position = [
        stage.size[0] / 2,
        stage.size[1] / 2
      ];
    };

    self.changeDirection = function(event) {
      switch (event.keyCode) {
        case 37: // left
        case 65: // a
          direction = direction == 'right' ? 'right' : 'left';
          break;
        case 39: // right
        case 68: // d
          direction = direction == 'left' ? 'left' : 'right';
          break;
        case 38: // up
        case 87: // w
          direction = direction == 'down' ? 'down' : 'up';
          break;
        case 40: // down
        case 83: // s
          direction = direction == 'up' ? 'up' : 'down';
          break;
        case 32: // space
          direction = 'none';
          break;
        case 27: // esc
          app.timer.pause();
          break;
      }
    };

    self.addPoint = function() {
      if (self.full()) {
        app.timer.stop();
        console.log('GAME OVER');
      }
      else {
        points.add(stage.size, self.occupied);
      }
    };

    self.checkBorder = function() {
      // left / right
      if (snake.position[0] < 0) {
        snake.position[0] = stage.size[0] -1;
      } else if (snake.position[0] >= stage.size[0]) {
        snake.position[0] = 0;
      }

      // up / down
      if (snake.position[1] < 0) {
        snake.position[1] = stage.size[1] -1;
      } else if (snake.position[1] >= stage.size[1]) {
        snake.position[1] = 0;
      }
    };

    self.checkHit = function(position) {
      if (self.hit('snake', position)) {
        self.reset();
      }
      if (self.hit('points', position)) {
        snake.length += app.config.grow;
        points.remove(snake.position);
        self.addPoint();
        app.state.score += app.config.POINT_VALUE;
      }
    };

    self.hit = function(typeName, position) {
      var type = app[typeName],
          hit = false;

      type.each(function(item) {
        if (item[0] == position[0] && item[1] == position[1]) {
          hit = true;
        }
      });

      return hit;
    };

    self.occupied = function(position) {
      var types = ['snake', 'points'],
          occupied = false;

      for (var i = types.length - 1; i >= 0; i--) {
        if (self.hit(types[i], position)) {
          occupied = true;
          break;
        }
      }

      return occupied;
    };

    self.full = function() {
      var max = stage.size[0] * stage.size[1],
          total = points.points.length + snake.segments.length;
      return total >= max;
    };

    self.reset = function() {
      self.center(snake);
      direction = 'none';
      snake.reset();
      app.timer.reset();
      app.state.score = 0;
    };

    self.init();

    return self;
  };

})(SnakeGame);
