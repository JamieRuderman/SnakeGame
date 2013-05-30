var SnakeGame = SnakeGame || {};

(function(app){

  app.Controller = function() {
    var self = {},
        stage = app.stage,
        snake = app.snake,
        points = app.points,
        state = app.state,
        direction = state.direction,
        moving;

    self.init = function() {
      self.reset();
    };

    self.move = function() {
      self.noReverse();

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

    self.noReverse = function() {
      if (moving == 'left' && direction =='right') direction = 'left';
      else if (moving == 'right' && direction =='left') direction = 'right';
      else if (moving == 'up' && direction =='down') direction = 'up';
      else if (moving == 'down' && direction =='up') direction = 'down';
      moving = direction;
    };

    self.center = function(sprite) {
      sprite.position = [
        Math.round(stage.size[0] / 2) - 1,
        Math.round(stage.size[1] / 2) - 1
      ];
    };

    self.changeDirection = function(event) {
      if (app.timer.ready) {
        app.timer.start();
      }

      switch (event.keyCode) {
        case 37: // left
        case 65: // a
          direction = 'left';
          break;
        case 39: // right
        case 68: // d
          direction = 'right';
          break;
        case 38: // up
        case 87: // w
          direction = 'up';
          break;
        case 40: // down
        case 83: // s
          direction = 'down';
          break;
        case 32: // space
        case 27: // esc
          app.timer.pause();
          app.audio.pause();
          break;
      }
    };

    self.addPoint = function() {
      if (app.hit.full()) {
        self.gameover();
      }
      else {
        points.add(app.hit.randomFree());
      }
    };

    self.checkHit = function(position) {
      if (app.hit.check('snake', position)) {
        self.gameover();
      }
      if (app.hit.check('obstacle', position)) {
        self.gameover();
      }
      if (app.hit.check('points', position)) {
        snake.length += state.grow;
        points.remove(snake.position);
        self.addPoint();
        state.score += state.pointValue;
        app.audio.score();
        // every set number of points go faster
        if (state.score % (state.pointValue * state.pointsToIncreaseSpeed) === 0) {
          app.timer.increase();
        }
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

    self.gameover = function() {
      $(window).off('keydown', self.changeDirection);
      app.timer.stop();
      app.menu.gameover();
      app.audio.gameover();
    };

    self.reset = function() {
      $(window).on('keydown', self.changeDirection);
      state.score = 0;
      self.center(snake);
      snake.reset();
      snake.addSegment(snake.position);
      points.reset();
      self.addPoint();
      app.timer.reset();
      app.audio.reset();
      app.audio.start();
      app.renderer.draw();
      app.display.update();
    };

    self.init();

    return self;
  };

})(SnakeGame);
